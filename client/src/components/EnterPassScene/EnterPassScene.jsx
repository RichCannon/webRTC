import { MyButton } from '../MyButton/MyButton'
import { MyInput } from '../MyInput/MyInput'
import * as Styles from './EnterPassSceneStyles'

const EnterPassScene = ({ roomValues, onChange, onSendRoomPasswordClick, isDisabled }) => {

   const onChangeHandler = e => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      onChange({ value, name })
   }

   return (
      <Styles.Container>
         <Styles.Wrapper>
            <Styles.H1>{`Enter room password`}</Styles.H1>
            <MyInput name={`password`}
               type={'password'}
               placeholder={`Password`}
               value={roomValues[`password`]}
               onChange={onChangeHandler} />
            <MyButton label={`Send password`} disabled={isDisabled} onClick={onSendRoomPasswordClick} />
         </Styles.Wrapper>
      </Styles.Container>
   )
}

export { EnterPassScene }