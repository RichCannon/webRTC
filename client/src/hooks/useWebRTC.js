import { useEffect, useRef, useCallback, useState } from "react"
import freeice from 'freeice'

import ACTIONS from "../common/socket/actions"
import useStateWithCallback from './useStateWithCallback'

export const LOCAL_VIDEO = `LOCAL_VIDEO`

export default function useWebRTC({ roomID, socket }) {
   const [clients, updateClients] = useStateWithCallback([])
   console.log(`USERWEBRTC`)
   const [usersInRoom, setUsersInRoom] = useState({})

   const addNewClient = useCallback((newClient, cb) => {
      updateClients(list => !list.includes(newClient) ? [...list, newClient] : list, cb);
   }, [updateClients]);

   // Store all peer connection which connects current client and all users in room
   const peerConnections = useRef({})
   // This will be ref to a my medial element (current client)
   const localMediaStream = useRef()
   // This will be link to all peer medial elements (<video/> on current client)
   const peerMediaElements = useRef({
      [LOCAL_VIDEO]: null
   })

   useEffect(() => {
      const handleNewPeer = async ({ peerID, createOffer }) => {
         // If we are who already in room: $peerId - is a id of user which trying to connect to room where we also located
         // If we are who trying to connect: $peerId = id of user who already in room

         // If we are already connected to the current peer
         if (peerID in peerConnections.current) {
            return console.warn(`Already connected to peer ${peerID}`)
         }

         peerConnections.current[peerID] = new RTCPeerConnection({
            iceServers: freeice()
         })

         let tracksNumber = 0

         // When we recieve a new track
         peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
            tracksNumber++

            if (tracksNumber === 2) { // video and audio track received
               tracksNumber = 0
               addNewClient(peerID, () => {
                  if (peerMediaElements.current[peerID]) {
                     peerMediaElements.current[peerID].srcObject = remoteStream
                  }
                  else {
                     // Fixing long render in case of many clients
                     let settled = false
                     const interval = setInterval(() => {
                        if (peerMediaElements.current[peerID]) {
                           peerMediaElements.current[peerID].srcObject = remoteStream
                           settled = true
                        }

                        if (settled) {
                           clearInterval(interval)
                        }
                     }, 1000)
                  }
               })
            }
         }


         // When new candidate trying to connect (creating offer or answer)
         peerConnections.current[peerID].onicecandidate = e => {
            if (e.candidate) {
               socket.emit(ACTIONS.RELAY_ICE, {
                  peerID,
                  iceCandidate: e.candidate
               })
            }
         }

         // There we adding content that will be send (from MediaStream we are getting MediaStreamTrack for video and audio)
         localMediaStream.current.getTracks().forEach(track => {
            peerConnections.current[peerID].addTrack(track, localMediaStream.current)
         })

         if (createOffer) { // If we are who connected
            const offer = await peerConnections.current[peerID].createOffer()

            // Set the content which we wanna to translate
            // Also this will trigger onicecandidate action
            await peerConnections.current[peerID].setLocalDescription(offer)

            // Here we send this cotent
            socket.emit(ACTIONS.RELAY_SDP, {
               peerID,
               sessionDescription: offer
            })
         }
      }

      socket.on(ACTIONS.ADD_PEER, handleNewPeer)

      return () => {
         socket.off(ACTIONS.ADD_PEER);
      }
   }, [])

   useEffect(() => {

      const setRemoteMedia = async ({ peerID, sessionDescription: remoteDescription, userData }) => {
         // $peerID - id of who connecting (if (remoteDescription.type === `offer`))
         // $remoteDescription - data with stream
         await peerConnections.current[peerID]?.setRemoteDescription(
            // new RTCSessionDescription - For capability with another browsers
            new RTCSessionDescription(remoteDescription)
         )

         setUsersInRoom(users => ({ ...users, [peerID]: userData.userName }))

         //console.log(`userData.userName: `, userData.userName)

         if (remoteDescription.type === `offer`) {
            const answer = await peerConnections.current[peerID].createAnswer()
            await peerConnections.current[peerID].setLocalDescription(answer)

            socket.emit(ACTIONS.RELAY_SDP, {
               peerID,
               sessionDescription: answer
            })
         }
      }
      socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)

      return () => {
         socket.off(ACTIONS.SESSION_DESCRIPTION);
      }
   }, [])

   useEffect(() => {
      socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }) => {
         // $peerID - id of who connecting
         peerConnections.current[peerID].addIceCandidate(new RTCIceCandidate(iceCandidate))
      })

      return () => {
         socket.off(ACTIONS.ICE_CANDIDATE);
      }
   }, [])

   useEffect(() => {
      const handleRemovePeer = ({ peerID }) => {
         if (peerConnections.current[peerID]) {
            peerConnections.current[peerID].close()
         }

         delete peerConnections.current[peerID]
         delete peerMediaElements.current[peerID]

         updateClients(list => list.filter(c => c !== peerID))
      }
      socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer)

      return () => {
         socket.off(ACTIONS.REMOVE_PEER);
      }

   }, [])

   // Creating our media stream of video from webCam
   useEffect(() => {
      const startCapture = async () => {
         // Getting our media content
         localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
               width: 1280,
               height: 720
            }
         })

         addNewClient(LOCAL_VIDEO, () => {
            const localVideoElement = peerMediaElements.current[LOCAL_VIDEO]

            if (localVideoElement) {
               localVideoElement.volume = 0
               localVideoElement.srcObject = localMediaStream.current
            }
         })
      }


      startCapture()
         .then(() => socket.emit(ACTIONS.JOIN, { room: roomID }))
         .catch(e => console.error('Error getting userMedia:', e))

      return () => {
         // Stop recording video when leave from room
         localMediaStream.current.getTracks().forEach(track => track.stop());
         // Leave from room
         socket.emit(ACTIONS.LEAVE)
      }

   }, [roomID])

   const provideMediaRef = useCallback((id, node) => {
      peerMediaElements.current[id] = node
   }, [])

   return {
      clients,
      provideMediaRef,
      usersInRoom
   }
}