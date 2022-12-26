import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  min-height: 80px;
  width: 300px;
  background-color: ${({ theme, type }) => theme.colors[type]};
  position: fixed;
  left: 50vw;
  padding: 16px;
  top: ${({ isVisible }) => isVisible ? `0px` : `-80px`};
  transition: .5s top;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  color: ${({ theme }) => theme.text.primary};
  overflow: hidden;
  cursor: pointer;
`