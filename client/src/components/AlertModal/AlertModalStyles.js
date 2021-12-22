import styled from 'styled-components'

export const Container = styled.div`
  min-height: 80px;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.error};
  position: fixed;
  left: 50vw;
  padding: 16px;
  top: ${({ isVisible }) => isVisible ? `0px` : `-80px`};
  transition: .5s top;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`