import { Route, Switch } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import useSocket, { SocketContext } from "../../hooks/useSocket"
// Components
import { Preloader } from "../../components/Preloader/Preloader"
// Pages
import { MainPage } from "../MainPage/MainPage"
import { NotFoundPage } from "../NotFoundPage/NotFoundPage"
import { RoomPage } from "../RoomPage/RoomPage"
// Selectors
import { currentUser, myUserDataSelector } from "../../logic/userLogic/userSelector"
// Actions with request
import { getMyUserDataRequest } from "../../logic/userLogic/userReducer"


const PrivateRouter = () => {

   const { token } = useSelector(currentUser)

   const socket = useSocket(token)
   const dispatch = useDispatch()

   const { data: myUserData, fetching: myUserDataFetching } = useSelector(myUserDataSelector)

   useEffect(() => {
      if (!myUserData) {
         dispatch(getMyUserDataRequest())
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

export { PrivateRouter }