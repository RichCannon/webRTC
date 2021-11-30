const EnterPassScene = ({ roomValues, onChange, onSendRoomPasswordClick, isDisabled }) => {

   const onChangeHandler = e => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      onChange({ value, name })
   }

   return (
      <div>
         <h1>{`Enter room password`}</h1>
         <input name={`password`}
            placeholder={`Password`}
            value={roomValues[`password`]}
            onChange={onChangeHandler} />
         <button disabled={isDisabled} onClick={onSendRoomPasswordClick} >{`SEND PASSWORD`}</button>
      </div>
   )
}

export { EnterPassScene }