import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import { MyButton } from '../../components/MyButton/MyButton'
import { MyInput } from '../../components/MyInput/MyInput'
import { appActions } from '../../logic/appLogic/appReducer'
import { ALERT_TYPE } from '../../logic/appLogic/constants'

import { registerUserRequest, userActions } from '../../logic/userLogic/userReducer'
import { myUserDataSelector } from '../../logic/userLogic/userSelector'
import { OnChangeT, OnSubmitT } from '../../types/common'
import { validFormCheck } from '../../utils/utils'
import { validators } from '../../utils/validators'
import { INIT_INPUT_REGISTER_VALUES } from './constants'
import * as Styled from './RegisterPageStyles'

const RegisterPage = () => {
   const [registerValues, setRegisterValues] = useState(INIT_INPUT_REGISTER_VALUES)
   const [registerValuesError, setRegisterValuesError] = useState<Partial<typeof INIT_INPUT_REGISTER_VALUES>>({})
   const history = useHistory()

   const dispatch = useDispatch()

   const { fetching: myUserDataFetching, /* error: myUserDataError */ } = useSelector(myUserDataSelector)

   const onChangeHandler: OnChangeT = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      setRegisterValues(values => ({ ...values, [name]: value }))
   }

   const onRegisterClick: OnSubmitT = (e) => {
      e.preventDefault()

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


      const pushToMainPage = () => {
         history.replace(`/`)
      }

      dispatch(userActions.registerRequest({ ...registerValues, pushToMainPage }))
      // .unwrap()
      //    .then(response => {
      //       console.log(response)
      //       dispatch(appActions.showAlert({ message: `Your account has been created. Go to a login page to proceed`, type: `ok` }))
      //       setRegisterValues(INIT_INPUT_REGISTER_VALUES)
      //    })
      //    .catch(e => {
      //       console.error(e)
      //       alert(e)
      //    })
   }

   return (
      <Styled.Container>
         <Styled.Wrapper>
            <Styled.H1>{`Register to Seer`}</Styled.H1>
            <Styled.Form onSubmit={onRegisterClick}>
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
               <MyButton loading={myUserDataFetching} label={`Register`} />
            </Styled.Form>
            <Styled.LinkToRegister>
               <Link to={`/login`}>{`Already have account? Click to login!`}</Link>
            </Styled.LinkToRegister>
         </Styled.Wrapper>
      </Styled.Container >
   )
}

export default RegisterPage