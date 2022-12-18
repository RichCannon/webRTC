import { useState, useEffect, useRef, useContext, memo } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../components/Modal/Modal'
import CreateRoomModal from '../../components/CreateRoomModal/CreateRoomModal'
import ACTIONS from '../../common/socket/actions'
import { createRoomRequest } from '../../logic/roomLogic/roomReducer'
import { userActions } from '../../logic/userLogic/userReducer'
import { SocketContext } from '../../hooks/useSocket'
import * as Styles from './MainPagesStyles'
import { MyButton } from '../../components/MyButton/MyButton'
import { createRoomSelector } from '../../logic/roomLogic/roomSelector'
import RoomList from './components/RoomList/RoomList'
import { USER_LOCAL_STORAGE_NAME } from '../../hooks/constants'




const MainPage = memo(() => {

   const { socket } = useContext(SocketContext)

   const [createRoomValues, setCreateRoomValues] = useState({})
   const [isVisible, setIsVisible] = useState(false)
   const [rooms, updateRooms] = useState([])
   const { fetching: createRoomFetching } = useSelector(createRoomSelector)
   const dispatch = useDispatch()
   const history = useHistory()
   const rootNode = useRef()

   const onChangeHandler = ({ name, value }) => {
      setCreateRoomValues((values) => ({ ...values, [name]: value }))
   }

   // useEffect(() => {
   //    if (createRoomData._id) {
   //       roomHandler({ roomId: createRoomData._id })
   //       setIsVisible(false)
   //    }

   // }, [createRoomData])

   useEffect(() => {
      // Get all available rooms
      if (!socket) return
      socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
         if (rootNode.current) {
            updateRooms(rooms)
         }
      })
   }, [socket])

   useEffect(() => {
      if (!isVisible && rootNode.current) {
         setCreateRoomValues({})
      }
   }, [isVisible])

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
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME)
   }

   
   return (
      <Styles.Container ref={rootNode}>
         <Styles.H1>{`Available rooms`}</Styles.H1>
         <MyButton label={`Create new room`} onClick={onCreateRoomClick} />
         <RoomList rooms={rooms} roomHandler={roomHandler} />
         <Modal onDissmissClick={onDissmissClick} isVisible={isVisible}>
            <CreateRoomModal
               fetching={createRoomFetching}
               onAcceptClick={onAcceptClick}
               values={createRoomValues}
               onChangeHandler={onChangeHandler} />
         </Modal>
         <MyButton label={`Logout`} onClick={onLogOutClick} />
      </Styles.Container>
   )
})

export { MainPage }