import styled from "styled-components";
import { InputStyles } from "./MyInput";

export const Container = styled.div`

`


type InputProps = {
  styleType: InputStyles
}

export const Wrapper = styled.div`
  position: relative;
  input:focus ~ label, input:not(:placeholder-shown) ~ label {
    top: -.5em;
    left: 4px;
    font-size: .8em;
    visibility: visible;
    padding: 0 .3em;
    color: ${({ theme }) => `${theme.colors.secondary}`};
  }
  
`

export const Input = styled.input<InputProps>`
  font-size: 1rem;
  padding: .7em;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme, styleType }) => `2px solid ${theme.colors[styleType]}`};
  font-weight: 600;
  width: 100%;
`

export const Label = styled.label`
  font-size: 1rem;
  position: absolute;
  left: calc(.7em + 2px);
  top: calc(.7em + 2px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => `${theme.colors.secondary}69`};
  transition: all .3s;
  pointer-events: none; 
`

export const ErrorWrapper = styled.p`
  display: flex;
  font-size: .8rem;
  height: 1.3em;  
  line-height: 1em;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.error}
`