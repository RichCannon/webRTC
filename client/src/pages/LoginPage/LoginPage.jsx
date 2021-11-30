import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import styles from './LoginPage.module.css'
import { loginUserRequest } from '../../logic/userLogic/userReducer'

const LoginPage = () => {

   const [loginValues, setLoginValues] = useState({})
   const dispatch = useDispatch()
   const history = useHistory()

   const onChangeHandler = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      setLoginValues(values => ({ ...values, [name]: value }))
   }

   const onLogInClick = () => {
      dispatch(loginUserRequest(loginValues)).unwrap()
         .then(response => {
            history.replace('/')
            console.log(response)
         })
         .catch(e => {
            console.error(e)
         })
   }



   return (
      <div className={styles.container}>
         <h1>Login page</h1>
         <input placeholder={"Login"} name={"login"} value={loginValues["login"]} onChange={onChangeHandler} />
         <input placeholder={"Password"} name={"password"} value={loginValues["password"]} onChange={onChangeHandler} />
         <button onClick={onLogInClick} >{`LOG IN`}</button>
         <Link to={`/register`}>{`Create account`}</Link>
      </div>
   )
}

export default LoginPage