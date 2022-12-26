import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-items: center;
`

export const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  width: min(95vw, 400px);
  row-gap: 20px;
`

export const H1 = styled.h1`
  text-align: center;
  line-height: 2em;
`

export const LinkToRegister = styled.span`
  font-size: 1rem;
  display: flex;
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-style: italic;
    text-align: center;
    width: 100%;
    height: 1.2em;
  } 
`
