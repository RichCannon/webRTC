import React, { FC } from 'react'

import * as Styles from './MyInputStyles'


export type InputStyles = `secondary` | `error` | `ok`

type MyInputT = {
  styleType?: InputStyles,
  placeholder?: string,
  errorText?: string,
} & React.InputHTMLAttributes<HTMLInputElement>

export const MyInput:FC<MyInputT> = ({ styleType = `secondary`, placeholder, errorText = ``, ...restProps }) => {

  return (
    <Styles.Container>
      <Styles.Wrapper>
        <Styles.Input placeholder={" "} styleType={errorText ? `error` : styleType} {...restProps} />
        <Styles.Label>{placeholder}</Styles.Label>
      </Styles.Wrapper>
      <Styles.ErrorWrapper>
        {errorText}
      </Styles.ErrorWrapper>
    </Styles.Container>
  )
}
