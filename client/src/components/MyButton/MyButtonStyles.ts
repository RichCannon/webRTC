import styled from "styled-components";
import { ButtonsType } from "./MyButton";

type ButtonP = {
  styleType: ButtonsType
}

export const Button = styled.button<ButtonP>`
  display:flex;
  align-content: center;
  justify-content:center;
  background-color: transparent;
  border: ${({ styleType, theme }) => `2px solid ${theme.colors[styleType]}`};
  color: ${({ styleType, theme }) => `${theme.colors[styleType]}`};
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

