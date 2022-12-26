import styled from "styled-components";

export const Container = styled.button`
  display:flex;
  align-content: center;
  justify-content:center;
  background-color: transparent;
  border: ${({ type, theme }) => `2px solid ${theme.colors[type]}`};
  color: ${({ type, theme }) => `${theme.colors[type]}`};
  padding: .7em;
  font-size: 1rem;
  font-weight: bold;
  transition: transform .2s;
  line-height: 1em;
  cursor: pointer;
  &:active {
    transform: scale(.95)
  }
`

