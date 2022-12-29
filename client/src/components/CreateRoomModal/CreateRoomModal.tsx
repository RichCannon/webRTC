import { FC } from 'react'
import { OnChangeT, OnClickT } from '../../types/common'
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

   return (
      <Styled.Container >
         <Styled.H1>{`Create room`}</Styled.H1>
         <Styled.Form>
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
               label={`Accept`}
               onClick={() => onAcceptClick(values)} />
         </Styled.Form>
      </Styled.Container>
   )
}

export default CreateRoomModal