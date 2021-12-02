import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: min(400px, 95vw);
  row-gap: 24px;
`

export const H1 = styled.h1`
  width: 100%;
  text-align: center
`