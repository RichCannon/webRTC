import ReactDOM from "react-dom"

import * as Styles from './ModalStyles'


const stopPropagation = (e) => e.stopPropagation()

const Modal = ({ isVisible, onDissmissClick, children }) => {

   if (!isVisible) return null

   return (
      ReactDOM.createPortal(
         <Styles.Container  onClick={onDissmissClick}>
            <div onClick={stopPropagation}>
               {children}
            </div>
         </Styles.Container>,
         document.getElementById('portal'))
   )
}

export default Modal