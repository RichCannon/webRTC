import React, { FC } from 'react'

import * as Styled from './MyInputStyles'


export type InputStyles = `secondary` | `error` | `ok`

type MyInputT = {
  styleType?: InputStyles,
  placeholder?: string,
  errorText?: string,
} & React.InputHTMLAttributes<HTMLInputElement>

export const MyInput:FC<MyInputT> = ({ styleType = `secondary`, placeholder, errorText = ``, ...restProps }) => {

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Input placeholder={" "} styleType={errorText ? `error` : styleType} {...restProps} />
        <Styled.Label>{placeholder}</Styled.Label>
      </Styled.Wrapper>
      <Styled.ErrorWrapper>
        {errorText}
      </Styled.ErrorWrapper>
    </Styled.Container>
  )
}
