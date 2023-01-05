import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Pages
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { userActions } from './logic/userLogic/userReducer'
import { currentUserSelector } from "./logic/userLogic/userSelector";
import { PrivateRouter } from './pages/PrivateRouter/PrivateRouter';
import { Preloader } from './components/Preloader/Preloader';
import { Layout } from './components/Layout/Layout';
import { USER_LOCAL_STORAGE_NAME } from './hooks/constants';



export const AppRouter = () => {

   const dispatch = useDispatch()
   const [isReady, setIsReady] = useState(false)
   const { token } = useSelector(currentUserSelector)


   useEffect(() => {
      const userData = localStorage.getItem(USER_LOCAL_STORAGE_NAME)
      if (userData) {
         const userDataParsed = JSON.parse(userData)
         dispatch(userActions.setCurrentUser(userDataParsed))
      }
      setIsReady(true)
   }, [])


   return (
      <BrowserRouter>
            <Layout>
               {isReady ?
                  <>
                     {token
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