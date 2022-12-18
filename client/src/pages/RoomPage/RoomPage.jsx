import { memo, useContext } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

import * as Styles from "./RoomPageStyles"

import { Preloader } from "../../components/Preloader/Preloader"
import withPassword from "../../hocs/withPassword/withPassword"
import { SocketContext } from "../../hooks/useSocket"
import useWebRTC from "../../hooks/useWebRTC"
import { LOCAL_VIDEO, TRACKS_TYPES } from "../../hooks/constants"
import { myUserDataSelector } from "../../logic/userLogic/userSelector"


const RoomPage = () => {

   const { socket } = useContext(SocketContext)
   const { id: roomID } = useParams()
   const { clients, provideMediaRef, usersInRoom, controlTracks, tracksControl, } = useWebRTC({ roomID, socket })

   const { data: myUserData, fetching: myUserDataFetching } = useSelector(myUserDataSelector)

   return (
      <Styles.Container>
         <h1>{roomID}</h1>
         {myUserDataFetching || !myUserData
            ? <Preloader />
            : <Styles.VideosWrapper>
               {clients.map((clientID) => {
                  const isCurrentUserTrack = clientID === LOCAL_VIDEO
                  const mutedVideo = isCurrentUserTrack ? !tracksControl[TRACKS_TYPES.VIDEO] : !usersInRoom[clientID]?.video
                  const mutedAudio = isCurrentUserTrack ? !tracksControl[TRACKS_TYPES.AUDIO] : !usersInRoom[clientID]?.audio
                  return (
                     <Styles.VideoCard
                        key={clientID}
                        mutedVideo={mutedVideo}
                        mutedAudio={mutedAudio}>
                        <video
                           width={`100%`}
                           height={`100%`}
                           ref={instance => provideMediaRef(clientID, instance)}
                           autoPlay
                           playsInline
                           muted={isCurrentUserTrack} />
                        <div>{isCurrentUserTrack ? (myUserData.userName || `Loading...`) : usersInRoom[clientID]?.userName}</div>
                        {isCurrentUserTrack && <>
                           <button onClick={() => controlTracks(TRACKS_TYPES.AUDIO, mutedAudio)}>STOP AUDIO</button>
                           <button onClick={() => controlTracks(TRACKS_TYPES.VIDEO, mutedVideo)}>STOP VIDEO</button>
                        </>}
                     </Styles.VideoCard>
                  )
               })}
            </Styles.VideosWrapper>
         }
      </Styles.Container>
   )
}

const ProtectedRoomPage = withPassword(memo(RoomPage))

export { ProtectedRoomPage as RoomPage }