import styled from 'styled-components'

export const Container = styled.div`
   width: min(95vw, 500px);
   display: flex;
   flex-direction: column;
   align-items: stretch;
   background-color: ${({theme}) => theme.colors.primary};
   padding: 26px;
   row-gap: 2rem;
   box-shadow: 8px 4px 20px 20px rgb(0 0 0 / 20%);
   z-index: 9
`

export const H1 = styled.h1`
  color: ${({theme}) => theme.colors.secondary};
  width: 100%;
  text-align: center
`