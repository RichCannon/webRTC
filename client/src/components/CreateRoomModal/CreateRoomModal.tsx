import { FC } from 'react'
import { OnChangeT } from '../../types/common'
import { MyButton } from '../MyButton/MyButton'
import { MyInput } from '../MyInput/MyInput'
import * as Styles from './CreateRoomStyles'

type CreateRoomModalT = {
   onChangeHandler: (props:  {name: string, value: string}) => void,
   values:  {name: string, password: string},
   onAcceptClick: () => void,
   fetching: boolean
}

const CreateRoomModal:FC<CreateRoomModalT> = ({ values, onChangeHandler, onAcceptClick, fetching }) => {

   const onChange: OnChangeT = ({currentTarget: {name, value}}) => {
      onChangeHandler({ value, name })
   }

   return (
      <Styles.Container >
         <Styles.H1>{`Create room`}</Styles.H1>
         <MyInput
            disabled={fetching}
            placeholder={"Name"}
            name={"name"}
            value={values["name"] || ``}
            onChange={onChange} />
         <MyInput
            disabled={fetching}
            placeholder={"Password"}
            name={"password"}
            type={"password"}
            value={values["password"] || ``}
            onChange={onChange} />
         <MyButton
            disabled={fetching}
            label={`Accept`}
            onClick={() => onAcceptClick(values)} />
      </Styles.Container>
   )
}

export default CreateRoomModal