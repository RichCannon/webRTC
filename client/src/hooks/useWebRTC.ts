import { useEffect, useRef, useCallback, useState } from "react"
import freeice from 'freeice'

import ACTIONS from "../common/socket/actions"
import useStateWithCallback from './useStateWithCallback'
import { DEFAULT_TRACKS_CONTROL_STATE, LOCAL_VIDEO, TRACKS_TYPES } from "./constants"
import { Socket } from "socket.io-client"

type WebRTCProps = {
   roomID: string,
   socket: Socket,
}

type ClientsStateT = string[]

type UsersInRoomStateT = {
   [key: string]: {
      userName: string,
      audio: boolean,
      video: boolean,

   }
}

type SetRemoteMediaProps = {
   peerID: string,
   sessionDescription: RTCSessionDescriptionInit,
   userData: { userName: string, tracksControl: { audio: boolean, video: boolean } }
}

type MuteTrackHandleProps = {
   id: string, tracksControl: { audio: boolean, video: boolean }
}

type HandleRemovePeerProps = {
   peerID: string
}

type AddNewIceCandidateProps = { peerID: string, iceCandidate: RTCIceCandidateInit }

export default function useWebRTC({ roomID, socket }: WebRTCProps) {
   const [clients, updateClients] = useStateWithCallback<ClientsStateT>([])
   const [usersInRoom, setUsersInRoom] = useState<UsersInRoomStateT>({})
   const [tracksControl, setTracksControl] = useState(DEFAULT_TRACKS_CONTROL_STATE)

   const addNewClient = useCallback((newClient: string, cb: ((prop: ClientsStateT) => void)) => {
      updateClients((list: ClientsStateT) => !list.includes(newClient) ? [...list, newClient] : list, cb)
   }, [updateClients]);

   // Store all peer connection which connects current client and all users in room
   const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({})
   // This will be ref to a my medial element (current client)
   const localMediaStream = useRef<MediaStream | null>(null)
   // This will be link to all peer medial elements (<video/> on current client)
   const peerMediaElements = useRef<{ [key: string]: HTMLVideoElement | null }>({
      [LOCAL_VIDEO]: null
   })

   useEffect(() => {
      const handleNewPeer = async ({ peerID, createOffer }: { peerID: string, createOffer: RTCSessionDescriptionInit }) => {
         // If we are who already in room: $peerId - id of user which trying to connect to room where we also located
         // If we are who trying to connect: $peerId - id of user who already in room

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
                     peerMediaElements.current[peerID]!.srcObject = remoteStream
                  }
                  else {
                     // Fixing long render in case of many clients
                     let settled = false
                     const interval = setInterval(() => {
                        if (peerMediaElements.current[peerID]) {
                           peerMediaElements.current[peerID]!.srcObject = remoteStream
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
         localMediaStream.current!.getTracks().forEach(track => {
            peerConnections.current[peerID].addTrack(track, localMediaStream.current!)
         })

         if (createOffer) { // If we are who trying to connect
            const offer = await peerConnections.current[peerID].createOffer()

            // Set the content which we wanna to translate
            // Also this will trigger onicecandidate action
            await peerConnections.current[peerID].setLocalDescription(offer)

            // Here we send this content
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

      const setRemoteMedia = async ({ peerID, sessionDescription: remoteDescription, userData }: SetRemoteMediaProps) => {
         // $peerID - id of who connecting (if (remoteDescription.type === `offer`))
         // $remoteDescription - data with stream
         await peerConnections.current[peerID]?.setRemoteDescription(
            // new RTCSessionDescription - For capability with another browsers
            new RTCSessionDescription(remoteDescription)
         )
         // If user have in his instance object with his mute status, we use this
         // If does nothing and mute object in socker instance doesn't exit, we just use default mute object
         setUsersInRoom(users => ({ ...users, [peerID]: { ...userData, ...(userData.tracksControl || DEFAULT_TRACKS_CONTROL_STATE) } }))

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

      const addNewIceCandidate = ({ peerID, iceCandidate }: AddNewIceCandidateProps) => {
         // $peerID - id of who connecting
         peerConnections.current[peerID].addIceCandidate(new RTCIceCandidate(iceCandidate))
      }

      socket.on(ACTIONS.ICE_CANDIDATE, addNewIceCandidate)

      return () => {
         socket.off(ACTIONS.ICE_CANDIDATE);
      }
   }, [])

   useEffect(() => {
      const handleRemovePeer = ({ peerID }: HandleRemovePeerProps) => {
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
      console.log(`JOINING ROOM`)
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
         if (localMediaStream.current) {
            console.log(`Stop recodring!`, localMediaStream.current)
            localMediaStream.current.getTracks().forEach(track => track.stop());
            // Leave from room
            socket.emit(ACTIONS.LEAVE)
         }
      }

   }, [roomID])

   const provideMediaRef = useCallback((id: string, node: HTMLVideoElement) => {
      peerMediaElements.current[id] = node
   }, [])


   const controlTracks = (muteType = TRACKS_TYPES.AUDIO, toogle = false) => {
      // Send users data that you are muted video or audio
      const tempTrackControls = { ...tracksControl, [muteType]: toogle }
      socket.emit(ACTIONS.MUTE_TRACK, { tracksControl: tempTrackControls, usersInRoom: Object.keys(usersInRoom) })

      localMediaStream.current &&
         localMediaStream.current.getTracks().forEach(track => {
            if (track.kind === muteType) {
               track.enabled = toogle
               setTracksControl(prev => ({ ...prev, [muteType]: toogle }))
            }
         });
   }

   // Control tracks mute status
   useEffect(() => {
      const muteTrackHandle = ({ id, tracksControl }: MuteTrackHandleProps) => {
         setUsersInRoom(prev => ({ ...prev, [id]: { ...prev[id], ...tracksControl } }))
      }
      socket.on(ACTIONS.MUTE_TRACK, muteTrackHandle)

      return () => {
         socket.off(ACTIONS.MUTE_TRACK);
      }

   }, [])


   return {
      clients,
      usersInRoom,
      provideMediaRef,
      controlTracks,
      tracksControl,
   }
}