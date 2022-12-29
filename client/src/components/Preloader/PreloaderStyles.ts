import styled from 'styled-components'

const CIRCLES_SIZE = 0.25

type ContainerP = {
  size: string
}

export const Container = styled.div<ContainerP>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  position: relative;
  width: ${({ size }) => `${size}`};
  height: ${({ size }) => `${size}`};
 div {
  width: ${({ size }) => `calc(${size}*${CIRCLES_SIZE})`};
  height: ${({ size }) => `calc(${size}*${CIRCLES_SIZE})`};
  border-radius: 50%;
  background: #fff;
  animation: lds-grid 1.2s linear infinite;
}
 div:nth-child(1) {
  animation-delay: 0s;
}
 div:nth-child(2) {
  animation-delay: -0.4s;
}
 div:nth-child(3) {
  animation-delay: -0.8s;
}
 div:nth-child(4) {
  animation-delay: -0.4s;
}
 div:nth-child(5) {
  animation-delay: -0.8s;
}
 div:nth-child(6) {
  animation-delay: -1.2s;
}
 div:nth-child(7) {
  animation-delay: -0.8s;
}
 div:nth-child(8) {
  animation-delay: -1.2s;
}
 div:nth-child(9) {
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

`