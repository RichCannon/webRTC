import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { MyButton } from '../../components/MyButton/MyButton'
import { MyInput } from '../../components/MyInput/MyInput'

import { registerUserRequest } from '../../logic/userLogic/userReducer'
import * as Styles from './RegisterPageStyles'

const RegisterPage = () => {
   const [registerValues, setRegisterValues] = useState({})

   const dispatch = useDispatch()

   const onChangeHandler = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      setRegisterValues(values => ({ ...values, [name]: value }))
   }

   const onRegisterClick = () => {
      const payload = { userName: registerValues.login, password: registerValues.password }
      dispatch(registerUserRequest(payload)).unwrap()
         .then(response => {
            console.log(response)
         })
         .catch(e => {
            console.error(e)
            alert(e)
         })
   }

   return (
      <Styles.Container>
         <Styles.Wrapper>
            <Styles.H1>{`Register to Seer`}</Styles.H1>
            <MyInput placeholder={"Login"} name={"login"} value={registerValues["login"]} onChange={onChangeHandler} />
            <MyInput placeholder={"Password"} name={"password"} value={registerValues["password"]} onChange={onChangeHandler} />
            <MyInput placeholder={"Repeat password"} name={"repeatPassword"} value={registerValues["repeatPassword"]} onChange={onChangeHandler} />
            <MyButton label={`Register`} onClick={onRegisterClick}/>
            <Styles.LinkToRegister>
               <Link to={`/login`}>{`Already have account? Click to login!`}</Link>
            </Styles.LinkToRegister>
         </Styles.Wrapper>
      </Styles.Container>
   )
}

export default RegisterPage