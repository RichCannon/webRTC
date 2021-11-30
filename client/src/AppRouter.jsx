import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Pages
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { STORAGE_NAME, userActions } from './logic/userLogic/userReducer'
import { currentUser } from "./logic/userLogic/userSelector";
import { PrivateRouter } from './pages/PrivateRouter/PrivateRouter';



export const AppRouter = () => {

   const dispatch = useDispatch()
   const [isReady, setIsReady] = useState(false)
   const { token, userId } = useSelector(currentUser)


   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem(STORAGE_NAME))
      if (userData) {
         dispatch(userActions.setCurrentUser(userData))
      }
      setIsReady(true)
   }, [])


   return (
      <BrowserRouter>
         {isReady ?
            <>
               {token && userId
                  ? <PrivateRouter />
                  : <Switch>
                     <Route exact path={'/login'} component={LoginPage} />
                     <Route exact path={'/register'} component={RegisterPage} />
                     <Redirect to={'/login'} />
                  </Switch>
               }
            </>
            : <div>Loading...</div>}
      </BrowserRouter>
   )
}