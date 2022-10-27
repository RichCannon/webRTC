import React from 'react'

import * as Styles from './MyInputStyles'

export const INPUT_TYPES = {
  secondary: `secondary`,
  error: `error`,
  ok: `ok`
}

export const MyInput = ({ styleType = INPUT_TYPES.secondary, placeholder, errorText = ``, ...restProps }) => {

  return (
    <Styles.Container>
      <Styles.Wrapper>
        <Styles.Input placeholder={" "} styleType={errorText ? INPUT_TYPES.error : styleType} {...restProps} />
        <Styles.Label>{placeholder}</Styles.Label>
      </Styles.Wrapper>
      <Styles.ErrorWrapper>
        {errorText}
      </Styles.ErrorWrapper>
    </Styles.Container>
  )
}
