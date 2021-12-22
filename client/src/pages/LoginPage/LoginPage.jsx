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
import { useEffect } from 'react'
import { appActions } from '../../logic/appLogic/appReducer'

const LoginPage = () => {

   const [loginValues, setLoginValues] = useState({})
   const [loginErrors, setLoginErrors] = useState({})
   const dispatch = useDispatch()
   const history = useHistory()
   const { fetching: myUserDataFetching, error: myUserDataError } = useSelector(myUserDataSelector)

   const onChangeHandler = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      setLoginValues(values => ({ ...values, [name]: value }))
   }

   useEffect(() => {
      if (myUserDataError) {
         setLoginErrors(errors => ({ ...errors, [myUserDataError.param]: myUserDataError.message }))
         if (myUserDataError.param === `alert`) {
            appActions.showAlert(myUserDataError.message)
         }
      }
   }, [myUserDataError])

   const onLogInClick = () => {
      const errors = {}
      errors.login = validators.required(loginValues.login)
      errors.login = validators.maxLength(loginValues.login)
      dispatch(loginUserRequest(loginValues)).unwrap()
         .then(response => {
            history.replace('/')
         })
         .catch(e => {
            console.error(e)
         })
   }

   const onPasswordClick = (name) => {
      setLoginErrors(errors => ({ ...errors, [name]: null }))
   }

   return (
      <Styles.Container>
         <Styles.Wrapper>
            <Styles.H1>{`Login to Seer`}</Styles.H1>
            <MyInput placeholder={"Login"} name={"login"} value={loginValues["login"]} onChange={onChangeHandler} />
            <MyInput
               type={'password'}
               errorText={loginErrors && loginErrors.password}
               placeholder={"Password"}
               name={"password"}
               value={loginValues["password"]}
               onChange={onChangeHandler}
               onClick={() => onPasswordClick(`password`)}
            />
            <MyButton loading={myUserDataFetching} disabled={myUserDataFetching} label={`Login`} onClick={onLogInClick} />
            <Styles.LinkToRegister>
               <Link to={`/register`}>{`Don't have an account? Click to register!`}</Link>
            </Styles.LinkToRegister>
         </Styles.Wrapper>
      </Styles.Container>
   )
}

export default LoginPage