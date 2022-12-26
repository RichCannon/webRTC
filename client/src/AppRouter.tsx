import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Pages
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { userActions } from './logic/userLogic/userReducer'
import { currentUser } from "./logic/userLogic/userSelector";
import { PrivateRouter } from './pages/PrivateRouter/PrivateRouter';
import { Preloader } from './components/Preloader/Preloader';
import { Layout } from './components/Layout/Layout';
import { USER_LOCAL_STORAGE_NAME } from './hooks/constants';



export const AppRouter = () => {

   const dispatch = useDispatch()
   const [isReady, setIsReady] = useState(false)
   const { token, userId } = useSelector(currentUser)


   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_NAME))
      if (userData) {
         dispatch(userActions.setCurrentUser(userData))
      }
      setIsReady(true)
   }, [])


   return (
      <BrowserRouter>
            <Layout>
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
                  : <Preloader />
               }
            </Layout>
      </BrowserRouter>
   )
}