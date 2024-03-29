import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { MyButton } from '../../components/MyButton/MyButton'
import { MyInput } from '../../components/MyInput/MyInput'
import { appActions } from '../../logic/appLogic/appReducer'
import { ALERT_TYPE } from '../../logic/appLogic/constants'

import { registerUserRequest } from '../../logic/userLogic/userReducer'
import { myUserDataSelector } from '../../logic/userLogic/userSelector'
import { validFormCheck } from '../../utils/utils'
import { validators } from '../../utils/validators'
import { INIT_INPUT_REGISTER_VALUES } from './constants'
import * as Styles from './RegisterPageStyles'

const RegisterPage = () => {
   const [registerValues, setRegisterValues] = useState(INIT_INPUT_REGISTER_VALUES)
   const [registerValuesError, setRegisterValuesError] = useState({})

   const dispatch = useDispatch()

   const { fetching: myUserDataFetching, /* error: myUserDataError */ } = useSelector(myUserDataSelector)

   const onChangeHandler = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      setRegisterValues(values => ({ ...values, [name]: value }))
   }

   const onRegisterClick = () => {
      const payload = { userName: registerValues.login, password: registerValues.password }

      const validSchema = {
         login: [validators.required, validators.maxLength(10)],
         password: [validators.required, validators.maxLength(20)],
         repeatPassword: validators.sameValues(registerValues.password, `Different passwords!`)
      }

      const errors = validFormCheck(registerValues, validSchema)

      if (errors) {
         setRegisterValuesError(errors)
         return
      }

      dispatch(registerUserRequest(payload)).unwrap()
         .then(response => {
            console.log(response)
            dispatch(appActions.showAlert({ message: `Your account has been created. Go to a login page to proceed`, type: ALERT_TYPE.SUCCESS }))
            setRegisterValues(INIT_INPUT_REGISTER_VALUES)
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
            <MyInput
               errorText={registerValuesError && registerValuesError.login}
               placeholder={"Login*"} name={"login"}
               value={registerValues.login}
               onChange={onChangeHandler} />
            <MyInput
               errorText={registerValuesError && registerValuesError.password}
               placeholder={"Password*"}
               name={"password"}
               value={registerValues.password}
               onChange={onChangeHandler} />
            <MyInput
               errorText={registerValuesError && registerValuesError.repeatPassword}
               placeholder={"Repeat password*"}
               name={"repeatPassword"}
               value={registerValues.repeatPassword}
               onChange={onChangeHandler} />
            <MyButton loading={myUserDataFetching} label={`Register`} onClick={onRegisterClick} />
            <Styles.LinkToRegister>
               <Link to={`/login`}>{`Already have account? Click to login!`}</Link>
            </Styles.LinkToRegister>
         </Styles.Wrapper>
      </Styles.Container>
   )
}

export default RegisterPage