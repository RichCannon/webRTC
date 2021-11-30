import ReactDOM from "react-dom"

import styles from "./Modal.module.css"


const stopPropagation = (e) => e.stopPropagation()

const Modal = ({ isVisible, onDissmissClick, children }) => {


   if (!isVisible) return null

   return (
      ReactDOM.createPortal(
         <div className={styles.container} onClick={onDissmissClick}>
            <div onClick={stopPropagation}>
               {children}
            </div>
         </div>,
         document.getElementById('portal'))
   )
}

export default Modal