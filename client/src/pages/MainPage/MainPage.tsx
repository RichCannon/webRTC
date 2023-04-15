import { useState, useEffect, useRef, useContext, memo } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '@/components/Modal/Modal'
import CreateRoomModal from '@/components/CreateRoomModal/CreateRoomModal'
import { MyButton } from '@/components/MyButton/MyButton'
import ACTIONS from '@/common/socket/actions'
import { userActions } from '@/logic/userLogic/userReducer'
import { SocketContext } from '@/hooks/useSocket'
import { createRoomSelector } from '@/logic/roomLogic/roomSelector'
import RoomList from './components/RoomList/RoomList'
import { USER_LOCAL_STORAGE_NAME } from '@/hooks/constants'
import { roomActions } from '@/logic/roomLogic/roomReducer'

import * as Styled from './MainPagesStyles'

export type RoomT = {
   id: string
   name: string
   numOfJoined: number
}

const INIT_CREATE_ROOM_VALUES = {
   name: ``,
   password: ``
}

const MainPage = () => {

   const { socket } = useContext(SocketContext)

   const [createRoomValues, setCreateRoomValues] = useState(INIT_CREATE_ROOM_VALUES)
   const [isVisible, setIsVisible] = useState(false)
   const [rooms, setRooms] = useState<RoomT[]>([])
   const { data: createRoomData, fetching: createRoomFetching } = useSelector(createRoomSelector)
   const dispatch = useDispatch()
   const history = useHistory()
   const rootNode = useRef<HTMLDivElement>(null)

   const onChangeHandler = ({ name, value }: { name: string, value: string }) => {
      setCreateRoomValues((values) => ({ ...values, [name]: value }))
   }

   useEffect(() => {
      // Get all available rooms
      if (!socket) return
      const handleShareRooms = ({ rooms = [] }: { rooms: RoomT[] }) => {
         if (rootNode.current) {
            setRooms(rooms)
         }
      }
      socket.on(ACTIONS.SHARE_ROOMS, handleShareRooms)
      return () => {
         socket.off(ACTIONS.SHARE_ROOMS)
      }
   }, [socket])

   useEffect(() => {
      if (!isVisible && rootNode.current) {
         setCreateRoomValues(INIT_CREATE_ROOM_VALUES)
      }
   }, [isVisible])


   // Creating new room
   const roomHandler = ({ roomId }: { roomId: string }) => {
      history.push(`/room/${roomId}`)
   }

   const onCreateRoomClick = () => {
      setIsVisible(true)
   }

   const onDissmissClick = () => {
      setIsVisible(false)
   }

   const onAcceptClick = (values: typeof INIT_CREATE_ROOM_VALUES) => {
      const onSuccessCreatRoomCallback = (roomId: string) => {
         roomHandler({ roomId })
         setIsVisible(false)
      }
      dispatch(roomActions.createRoomRequest({ ...values, onSuccessCreatRoomCallback }))
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
      <Styled.Container ref={rootNode}>
         <Styled.H1>{`Available rooms`}</Styled.H1>
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
      </Styled.Container>
   )
}

export default memo(MainPage) 