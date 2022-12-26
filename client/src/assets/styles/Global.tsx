import { createGlobalStyle } from 'styled-components'


// Глобальные стили
export const Global = createGlobalStyle`
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: "Roboto", sans-serif;
}
input:focus,
textarea:focus,
select:focus {
   outline: none;
}
`