import styles from './CreateRoomModal.module.css'

const CreateRoomModal = ({ values, onChangeHandler, onAcceptClick }) => {

   const onChange = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      onChangeHandler({ value, name })
   }
   return (
      <div className={styles.container}>
         <h1>{`Create room`}</h1>
         <input placeholder={"Name"} name={"name"} value={values["name"] || ``} onChange={onChange} />
         <input placeholder={"Password"} name={"password"} value={values["password"] || ``} onChange={onChange} />
         <button onClick={() => onAcceptClick(values)}>{"Accept"}</button>
      </div>
   )
}

export default CreateRoomModal