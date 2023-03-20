import { ComponentType, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { roomActions } from "../../logic/roomLogic/roomReducer"
import { checkRoomSelector, enterRoomPassSelector } from "../../logic/roomLogic/roomSelector"

import { Preloader } from '../../components/Preloader/Preloader'
import { EnterPassScene } from "../../components/EnterPassScene/EnterPassScene"
import { OnChangeT } from "../../types/common"


const withPassword = (Component: ComponentType) => ({ ...props }) => {

   const { data: checkRoomData, fetching: checkRoomFetching, /* error: checkRoomError */ } = useSelector(checkRoomSelector)
   const { /* data: enterRoomData, */ fetching: enterRoomFetching, /* error: enterRoomError */ } = useSelector(enterRoomPassSelector)

   // if (checkRoomError || enterRoomError) {
   //    console.error(checkRoomError)
   //    console.error(enterRoomError)
   // }

   const { id: roomId } = useParams<{ id: string }>()
   const [roomValues, setRoomValues] = useState({ password: `` })

   const onChange: OnChangeT = ({ currentTarget: { value, name } }) => {
      setRoomValues((values) => ({ ...values, [name]: value }))
   }

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(roomActions.checkRoomRequest({ roomId }));
      return () => {
         dispatch(roomActions.checkRoomReset())
      }
   }, [])

   const onSendRoomPasswordClick = () => {
      dispatch(roomActions.enterRoomPassRequest({ roomId, password: roomValues.password }))
   }

   if (checkRoomFetching) {
      return <Preloader />
   }

   return (<>
      {checkRoomData?.connected
         ? <Component {...props} />
         : <EnterPassScene
            isLoading={enterRoomFetching}
            roomValues={roomValues}
            onChange={onChange}
            onSendRoomPasswordClick={onSendRoomPasswordClick} />
      }
   </>
   )
}

export default withPassword