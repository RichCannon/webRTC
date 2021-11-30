import { ThemeProvider } from "styled-components"

import { theme } from "../../assets/styles/theme"
import { LayoutContainer } from "./LayoutStyles"


export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>
        {children}
      </LayoutContainer>
    </ThemeProvider>
  )
}

