import { Route, Switch, useHistory } from "react-router"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import useSocket, { SocketContext } from "../../hooks/useSocket"
// Components
import { Preloader } from "../../components/Preloader/Preloader"
// Pages
import MainPage from "../MainPage/MainPage"
import { NotFoundPage } from "../NotFoundPage/NotFoundPage"
import { RoomPage } from "../RoomPage/RoomPage"
// Selectors
import { currentUserSelector, myUserDataSelector } from "../../logic/userLogic/userSelector"
// Actions with request
import { userActions } from "../../logic/userLogic/userReducer"
import { USER_LOCAL_STORAGE_NAME } from "../../hooks/constants"


const PrivateRouter = () => {

   const { token } = useSelector(currentUserSelector)

   const socket = useSocket(token!)
   const dispatch = useDispatch()
   const history = useHistory()

   const { data: myUserData, fetching: myUserDataFetching } = useSelector(myUserDataSelector)

   useEffect(() => {
      if (!myUserData) {
         const getMyUserDataErrorCallback = () => {
            localStorage.removeItem(USER_LOCAL_STORAGE_NAME)
            history.push(`/`)
         }
         dispatch(userActions.getMyUserDataRequest({ getMyUserDataErrorCallback }))
         // .unwrap()
         //    .then(response => {
         //       console.log(response)
         //    })
         //    .catch(e => {
         //       console.error(e) 
         //       localStorage.removeItem(USER_LOCAL_STORAGE_NAME)
         //       alert(e.message)
         //       history.push(`/`)
         //    })
      }
   }, [myUserData])

   return (
      <SocketContext.Provider value={{ socket }}>
         {socket && !myUserDataFetching
            ? <Switch>
               <Route exact path={`/room/:id`} component={RoomPage} />
               <Route exact path={`/`} component={MainPage} />
               <Route component={NotFoundPage} />
            </Switch>
            : <Preloader />
         }
      </SocketContext.Provider >
   )
}

export default  memo(PrivateRouter)