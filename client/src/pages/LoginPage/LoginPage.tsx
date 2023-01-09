import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { userActions } from '../../logic/userLogic/userReducer'
import { MyButton } from '../../components/MyButton/MyButton'
import * as Styled from './LoginPageStyles'
import { MyInput } from '../../components/MyInput/MyInput'
import { myUserDataSelector } from '../../logic/userLogic/userSelector'
import { validators } from '../../utils/validators'
import { useEffect } from 'react'
import { appActions } from '../../logic/appLogic/appReducer'
import { INIT_INPUT_LOGIN_VALUES } from './constants'
import { validFormCheck } from '../../utils/utils'
import { OnChangeT, OnClickT, OnSubmitT } from '../../types/common'





const LoginPage = () => {

   const [loginValues, setLoginValues] = useState(INIT_INPUT_LOGIN_VALUES)
   const [loginErrors, setLoginErrors] = useState<Partial<typeof INIT_INPUT_LOGIN_VALUES>>({})
   const dispatch = useDispatch()
   const history = useHistory()

   const { fetching: myUserDataFetching, error: myUserDataError} = useSelector(myUserDataSelector)

   const onChangeHandler: OnChangeT = ({ currentTarget: { value, name } }) => {
      setLoginValues(values => ({ ...values, [name]: value }))
   }

   useEffect(() => {
      if (myUserDataError) {
         if (myUserDataError.param === `alert`) {
            appActions.showAlert({ message: myUserDataError.message })
            return
         }
         setLoginErrors(errors => ({ ...errors, [myUserDataError.param]: myUserDataError.message }))
      }
   }, [myUserDataError])

   const onLogInClick: OnSubmitT = (e) => {
      e.preventDefault();
      const validSchema = {
         login: [validators.required, validators.maxLength(10)],
         password: [validators.required, validators.maxLength(20)]
      }

      const errors = validFormCheck(loginValues, validSchema)

      if (errors) {
         setLoginErrors(errors)
         return
      }

      const pushToMainPage = () => {
         history.replace(`/`)
      }

      dispatch(userActions.loginRequest({ ...loginValues, pushToMainPage }))

   }

   const handleClickResetInputError: OnClickT = ({ currentTarget: { name } }) => {
      setLoginErrors(errors => ({ ...errors, [name]: null }))
   }

   return (
      <Styled.Container>
         <Styled.Wrapper>
            <Styled.H1>{`Login to Seer`}</Styled.H1>
            <Styled.Form onSubmit={onLogInClick}>
               <MyInput
                  errorText={loginErrors && loginErrors.login}
                  placeholder={"Login*"}
                  name={"login"}
                  value={loginValues["login"]}
                  onChange={onChangeHandler}
                  onClick={handleClickResetInputError} />
               <MyInput
                  type={'password'}
                  errorText={loginErrors && loginErrors.password}
                  placeholder={"Password*"}
                  name={"password"}
                  value={loginValues["password"]}
                  onChange={onChangeHandler}
                  onClick={handleClickResetInputError}
               />
               <MyButton
                  type='submit'
                  loading={myUserDataFetching}
                  disabled={myUserDataFetching}
                  label={`Login`}
               />
            </Styled.Form>
            <Styled.LinkToRegister>
               <Link to={`/register`}>{`Don't have an account? Click to register!`}</Link>
            </Styled.LinkToRegister>
         </Styled.Wrapper>
      </Styled.Container>
   )
}

export default LoginPage