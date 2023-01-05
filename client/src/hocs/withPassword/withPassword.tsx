import { ComponentType, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { roomActions } from "../../logic/roomLogic/roomReducer"
import { checkRoomSelector, enterRoomPassSelector } from "../../logic/roomLogic/roomSelector"

import { Preloader } from '../../components/Preloader/Preloader'
import { EnterPassScene } from "../../components/EnterPassScene/EnterPassScene"
import { appActions } from "../../logic/appLogic/appReducer"
import { OnChangeT } from "../../types/common"


const withPassword = (Component: ComponentType) => ({ ...props }) => {

   const { data: checkRoomData, fetching: checkRoomFetching, error: checkRoomError } = useSelector(checkRoomSelector)
   const { /* data: enterRoomData, */ fetching: enterRoomFetching, error: enterRoomError } = useSelector(enterRoomPassSelector)

   if (checkRoomError || enterRoomError) {
      console.error(checkRoomError)
      console.error(enterRoomError)
   }

   const { id: roomId } = useParams<{id: string}>()
   const [roomValues, setRoomValues] = useState({ password: `` })

   const onChange:OnChangeT = ({ target: { value, name } }) => {
      setRoomValues((values) => ({ ...values, [name]: value }))
   }

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(roomActions.checkRoomRequest({ roomId }))
   }, [])

   const onSendRoomPasswordClick = () => {
      dispatch(roomActions.enterRoomPassRequest({ roomId, password: roomValues.password }))
      // .unwrap()
      //    .then(() => { })
      //    .catch(e => {
      //       dispatch(appActions.showAlert({ message: e?.message || e.reason }))}
      //    )
   }

   return (
      <>
         {checkRoomFetching
            ? <Preloader />
            : <>
               {checkRoomData?.connected
                  ? <Component {...props} />
                  : <EnterPassScene
                     isLoading={enterRoomFetching}
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