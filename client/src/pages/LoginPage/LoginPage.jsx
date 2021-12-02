import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { loginUserRequest } from '../../logic/userLogic/userReducer'
import { MyButton } from '../../components/MyButton/MyButton'
import * as Styles from './LoginPageStyles'
import { MyInput } from '../../components/MyInput/MyInput'
import { myUserDataSelector } from '../../logic/userLogic/userSelector'
import { validators } from '../../utils/validators'

const LoginPage = () => {

   const [loginValues, setLoginValues] = useState({})
   const [loginErrors, setLoginErrors] = useState({})
   const dispatch = useDispatch()
   const history = useHistory()
   const { fetching: myUserDataFetching } = useSelector(myUserDataSelector)

   const onChangeHandler = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      setLoginValues(values => ({ ...values, [name]: value }))
   }

   const onLogInClick = () => {

      const errors = {}
      errors.login = validators.required(loginValues.login)
      errors.login = validators.maxLength(loginValues.login)
      

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
      <Styles.Container>
         <Styles.Wrapper>
            <Styles.H1>{`Login to Seer`}</Styles.H1>
            <MyInput placeholder={"Login"} name={"login"} value={loginValues["login"]} onChange={onChangeHandler} />
            <MyInput placeholder={"Password"} name={"password"} value={loginValues["password"]} onChange={onChangeHandler} />
            <MyButton loading={myUserDataFetching} disabled={myUserDataFetching} label={`Login`} onClick={onLogInClick} />
            <Styles.LinkToRegister>
               <Link to={`/register`}>{`Don't have an account? Click to register!`}</Link>
            </Styles.LinkToRegister>
         </Styles.Wrapper>
      </Styles.Container>
   )
}

export default LoginPage