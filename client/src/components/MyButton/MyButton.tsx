import React from 'react'

import { Preloader } from '../Preloader/Preloader'
import * as Styles from './MyButtonStyles'

const BUTTON_TYPES = {
  secondary: `secondary`,
  error: `error`,
  ok: `ok`
}

export const MyButton = ({ label, type = BUTTON_TYPES.secondary, onClick, disabled = false, loading = false }) => {
  return (
    <Styles.Container onClick={onClick} type={type} disabled={disabled} >
      {!loading
        ? <span>
          {label}
        </span>
        : <Preloader size={`1em`} />
      }
    </Styles.Container>
  )
}
