import { useState, useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router'
import { v4 } from 'uuid'

import styles from './MainPage.module.css'
import Modal from '../../components/Modal/Modal'
import CreateRoomModal from '../../components/CreateRoomModal/CreateRoomModal'
//import socket from "../../socket/index.js"
import ACTIONS from '../../common/socket/actions'
import { useDispatch, useSelector } from 'react-redux'
import { createRoomRequest } from '../../logic/roomLogic/roomReducer'
import { getMyUserDataRequest, STORAGE_NAME, userActions } from '../../logic/userLogic/userReducer'
import { myUserDataSelector } from '../../logic/userLogic/userSelector'
import { SocketContext } from '../../hooks/useSocket'
import { Preloader } from '../../components/Preloader/Preloader'




const MainPage = () => {

   const { socket } = useContext(SocketContext)

   const [createRoomValues, setCreateRoomValues] = useState({})
   const [isVisible, setIsVisible] = useState(false)
   const dispatch = useDispatch()
   const { data: myUserData, fetching: myUserDataFetching } = useSelector(myUserDataSelector)

   const history = useHistory()
   const [rooms, updateRooms] = useState([])
   const rootNode = useRef()

   const onChangeHandler = ({ name, value }) => {
      setCreateRoomValues((values) => ({ ...values, [name]: value }))
   }
   console.log(`Main page`)



   useEffect(() => {
      // Get all available rooms
      if (!socket) return
      socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
         if (rootNode.current) {
            updateRooms(rooms)
         }
      })
   }, [socket])

   // Creating new room
   const roomHandler = ({ roomId }) => {
      history.push(`/room/${roomId}`)
   }

   const onCreateRoomClick = () => {
      setIsVisible(true)
   }

   const onDissmissClick = () => {
      setIsVisible(false)
   }

   const onAcceptClick = (values) => {
      dispatch(createRoomRequest(values)).unwrap()
         .then(response => {
            roomHandler({ roomId: response._id })
            setIsVisible(false)
         })
         .catch(e => {
            console.log(`Error:`, e)
         })
   }

   const onLogOutClick = () => {
      dispatch(userActions.setCurrentUser({
         token: null,
         userId: null
      }))
      dispatch(userActions.setMyUserData(null))
      localStorage.removeItem(STORAGE_NAME)
   }

   // console.log(`rooms: `, rooms)

   return (
      <div ref={rootNode}>
         <>
            <h1>{`Available Rooms`}</h1>
            <ul>
               {rooms.map(roomId => (
                  <li key={roomId}>
                     {roomId}
                     <button onClick={() => roomHandler({ roomId })}>{`JOIN ROOM`}</button>
                  </li>
               ))}
            </ul>
            <button onClick={onCreateRoomClick}>{`CREATE NEW ROOM`}</button>
            <Modal onDissmissClick={onDissmissClick} isVisible={isVisible}>
               <CreateRoomModal onAcceptClick={onAcceptClick} values={createRoomValues} onChangeHandler={onChangeHandler} />
            </Modal>
            <button onClick={onLogOutClick}>{`LOG OUT`}</button>
         </>

      </div>
   )
}

export { MainPage }