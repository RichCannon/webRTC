import { useEffect } from 'react'
import { MyButton } from '../MyButton/MyButton'
import { MyInput } from '../MyInput/MyInput'
import * as Styles from './CreateRoomStyles'

const CreateRoomModal = ({ values, onChangeHandler, onAcceptClick, fetching }) => {

   const onChange = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
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