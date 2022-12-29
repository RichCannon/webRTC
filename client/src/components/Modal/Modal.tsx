import { FC } from "react"
import ReactDOM from "react-dom"
import { OnClickT } from "../../types/common"

import * as Styled from './ModalStyles'

type ModalP = {
   isVisible?: boolean,
   onDissmissClick: OnClickT<HTMLDivElement>,
   children: JSX.Element,
}

const stopPropagation: OnClickT<HTMLDivElement> = (e) => e.stopPropagation()

const Modal:FC<ModalP> = ({ isVisible, onDissmissClick, children }) => {

   if (!isVisible) return null
   
   const portalEl = document.getElementById('portal')

   if(!portalEl) return null

   return (
      ReactDOM.createPortal(
         <Styled.Container  onClick={onDissmissClick}>
            <div onClick={stopPropagation}>
               {children}
            </div>
         </Styled.Container>,
         portalEl)
   )
}

export default Modal