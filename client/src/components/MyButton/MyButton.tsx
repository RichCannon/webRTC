import React, { FC } from 'react'

import { Preloader } from '../Preloader/Preloader'
import * as Styled from './MyButtonStyles'

export type ButtonsType = `secondary` | `error` |  `ok`

type MyButtonP =   {
  label: string,
  styleType?: ButtonsType,
  loading?: boolean,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const MyButton:FC<MyButtonP> = ({ label, styleType = `secondary`, loading = false, ...defaultProps }) => {
  return (
    <Styled.Button styleType={styleType} {...defaultProps} >
      {!loading
        ? <span>
          {label}
        </span>
        : <Preloader size={`1em`} />
      }
    </Styled.Button>
  )
}
