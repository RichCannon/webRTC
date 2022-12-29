import { FC } from 'react'
import { OnChangeT, OnClickT, OnSubmitT } from '../../types/common'
import { MyButton } from '../MyButton/MyButton'
import { MyInput } from '../MyInput/MyInput'
import * as Styled from './CreateRoomStyles'

type CreateRoomModalT = {
   onChangeHandler: (props: { name: string, value: string }) => void,
   values: { name: string, password: string },
   onAcceptClick: (prop: { name: string, password: string }) => void,
   fetching: boolean
}

const CreateRoomModal: FC<CreateRoomModalT> = ({ values, onChangeHandler, onAcceptClick, fetching }) => {

   const onChange: OnChangeT = ({ currentTarget: { name, value } }) => {
      onChangeHandler({ value, name })
   }

   const onSubmit: OnSubmitT = (e) => {
      e.preventDefault()
      onAcceptClick(values)
   }

   return (
      <Styled.Container >
         <Styled.H1>{`Create room`}</Styled.H1>
         <Styled.Form onSubmit={onSubmit}>
            <MyInput
               disabled={fetching}
               placeholder={"Name"}
               name={"name"}
               value={values["name"]}
               onChange={onChange} />
            <MyInput
               disabled={fetching}
               placeholder={"Password"}
               name={"password"}
               type={"password"}
               value={values["password"]}
               onChange={onChange} />
            <MyButton
               disabled={fetching}
               label={`Accept`} />
         </Styled.Form>
      </Styled.Container>
   )
}

export default CreateRoomModal