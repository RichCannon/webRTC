import { FC } from 'react'

import { OnChangeT, OnSubmitT } from '../../types/common'
import { MyButton } from '../MyButton/MyButton'
import { MyInput } from '../MyInput/MyInput'
import * as Styled from './EnterPassSceneStyles'

type EnterPassScene = {
   roomValues: {
      password: string,
   },
   onChange: OnChangeT,
   onSendRoomPasswordClick: () => void,
   isLoading: boolean
}

const EnterPassScene: FC<EnterPassScene> = ({ roomValues, onChange, onSendRoomPasswordClick, isLoading }) => {


   const onSubmit: OnSubmitT = (e) => {
      e.preventDefault()
      onSendRoomPasswordClick()
   }

   return (
      <Styled.Container>
         <Styled.Wrapper>
            <Styled.H1>{`Enter room password`}</Styled.H1>
            <Styled.Form onSubmit={onSubmit}>
               <MyInput name={`password`}
                  disabled={isLoading}
                  type={'password'}
                  placeholder={`Password`}
                  value={roomValues.password}
                  onChange={onChange} />
               <MyButton type='submit'
                  loading={isLoading}
                  label={`Send password`}
                  disabled={isLoading} />
            </Styled.Form>
         </Styled.Wrapper>
      </Styled.Container>
   )
}

export { EnterPassScene }