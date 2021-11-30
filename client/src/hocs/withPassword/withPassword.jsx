import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { checkRoomRequest, enterRoomPassRequest } from "../../logic/roomLogic/roomReducer"
import { checkRoomSelector, enterRoomPassSelector } from "../../logic/roomLogic/roomSelector"

import { Preloader } from '../../components/Preloader/Preloader'
import { EnterPassScene } from "../../components/EnterPassScene/EnterPassScene"


const withPassword = Component => ({ ...props }) => {

   const { data: checkRoomData, fetching: checkRoomFetching, error: checkRoomError } = useSelector(checkRoomSelector)
   const { data: enterRoomData, fetching: enterRoomFetching, error: enterRoomError } = useSelector(enterRoomPassSelector)


   if (checkRoomError || enterRoomError) {
      console.error(checkRoomError)
      console.error(enterRoomError)
   }

   const { id: roomId } = useParams()

   const [roomValues, setRoomValues] = useState({})

   const onChange = ({ name, value }) => {
      setRoomValues((values) => ({ ...values, [name]: value }))
   }

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(checkRoomRequest({ roomId }))
   }, [])

   const onSendRoomPasswordClick = () => {
      dispatch(enterRoomPassRequest({ roomId, password: roomValues[`password`] }))
   }

   return (
      <>
         {checkRoomFetching
            ? <Preloader />
            : <>
               {checkRoomData.connected
                  ? <Component {...props} />
                  : <EnterPassScene
                     isDisabled={enterRoomFetching}
                     roomValues={roomValues}
                     onChange={onChange}
                     onSendRoomPasswordClick={onSendRoomPasswordClick} />
               }
            </>
         }
      </>
   )
}

export default withPassword