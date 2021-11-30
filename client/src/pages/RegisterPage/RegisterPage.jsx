import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

import { registerUserRequest } from '../../logic/userLogic/userReducer'
import styles from './RegisterPage.module.css'

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
      <div className={styles.container}>
         <h1>Register page</h1>
         <input placeholder={"Login"} name={"login"} value={registerValues["login"]} onChange={onChangeHandler} />
         <input placeholder={"Password"} name={"password"} value={registerValues["password"]} onChange={onChangeHandler} />
         <input placeholder={"Repeat password"} name={"repeatPassword"} value={registerValues["repeatPassword"]} onChange={onChangeHandler} />
         <button onClick={onRegisterClick}>{`REGISTER`}</button>
         <Link to={`/login`}>{`Already have account?`}</Link>
      </div>
   )
}

export default RegisterPage