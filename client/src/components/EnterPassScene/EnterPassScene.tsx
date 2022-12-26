import { MyButton } from '../MyButton/MyButton'
import { MyInput } from '../MyInput/MyInput'
import * as Styles from './EnterPassSceneStyles'

const EnterPassScene = ({ roomValues, onChange, onSendRoomPasswordClick, isLoading }) => {


   return (
      <Styles.Container>
         <Styles.Wrapper>
            <Styles.H1>{`Enter room password`}</Styles.H1>
            <MyInput name={`password`}
               disabled={isLoading}
               type={'password'}
               placeholder={`Password`}
               value={roomValues.password}
               onChange={onChange} />
            <MyButton loading={isLoading} label={`Send password`} disabled={isLoading} onClick={onSendRoomPasswordClick} />
         </Styles.Wrapper>
      </Styles.Container>
   )
}

export { EnterPassScene }