import * as Styled from './PreloaderStyles'

export const Preloader = ({ size = `1rem` }) => {
   return (
      <Styled.Container size={size}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </Styled.Container>
   )
}