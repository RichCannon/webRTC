import { useContext } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

import * as Styles from "./RoomPageStyles"

import { Preloader } from "../../components/Preloader/Preloader"
import withPassword from "../../hocs/withPassword/withPassword"
import { SocketContext } from "../../hooks/useSocket"
import useWebRTC, { LOCAL_VIDEO } from "../../hooks/useWebRTC"
import { myUserDataSelector } from "../../logic/userLogic/userSelector"


const RoomPage = () => {

   const { socket } = useContext(SocketContext)
   const { id: roomID } = useParams()
   const { clients, provideMediaRef, usersInRoom } = useWebRTC({ roomID, socket })

   const { data: myUserData, fetching: myUserDataFetching } = useSelector(myUserDataSelector)
   
   return (
      <Styles.Container>
         <h1>{roomID}</h1>
         {myUserDataFetching || !myUserData
            ? <Preloader />
            : <Styles.VideosWrapper>
               {clients.map((clientID) => (
                  <Styles.VideoCard key={clientID}>
                     <video
                        width={`100%`}
                        height={`100%`}
                        ref={instance => provideMediaRef(clientID, instance)}
                        autoPlay
                        playsInline
                        muted={clientID === LOCAL_VIDEO} />
                     <div>{clientID === LOCAL_VIDEO ? (myUserData.userName || `Loading...`) : usersInRoom[clientID]}</div>
                  </Styles.VideoCard>
               ))}
            </Styles.VideosWrapper>
         }
      </Styles.Container>
   )
}

const ProtectedRoomPage = withPassword(RoomPage)

export { ProtectedRoomPage as RoomPage }