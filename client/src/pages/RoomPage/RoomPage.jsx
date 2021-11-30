import { useContext } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

import { VideosWrapper } from "./RoomPageStyles"

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
   // const videoLayout = layout(clients.length)

   console.log(`myUserData`, myUserData)

   return (
      <div style={{
         display: `flex`,
         flexWrap: `wrap`,
         flexDirection: `column`,
         alignItems: `center`,
      }}>
         <h1>{roomID}</h1>
         {myUserDataFetching || !myUserData
            ? <Preloader />
            : <VideosWrapper>
               {clients.map((clientID) => (
                  <div key={clientID} style={{
                     display: `flex`,
                     width: `40vw`,
                     flexDirection: `column`
                  }} >
                     <video
                        width={`100%`}
                        height={`100%`}
                        ref={instance => provideMediaRef(clientID, instance)}
                        autoPlay
                        playsInline
                        muted={clientID === LOCAL_VIDEO} />
                     <div>{clientID === LOCAL_VIDEO ? (myUserData.userName || `Loading...`) : usersInRoom[clientID]}</div>
                  </div>
               ))}
            </VideosWrapper>
         }
      </div>
   )
}

const ProtectedRoomPage = withPassword(RoomPage)

export { ProtectedRoomPage as RoomPage }