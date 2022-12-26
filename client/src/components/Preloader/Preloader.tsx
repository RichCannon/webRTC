import * as Styles from './PreloaderStyles'

export const Preloader = ({ size = `1rem`}) => {
   return (
      <Styles.Container size={size}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></Styles.Container>
   )
}