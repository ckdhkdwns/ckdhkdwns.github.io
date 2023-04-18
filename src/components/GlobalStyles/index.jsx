import { createGlobalStyle } from "styled-components"
import "fontsource-noto-sans-kr";
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
    word-spacing: 0.1rem;
    font-weight: 400;

    background: ${props => props.theme.colors.bodyBackground};
  }

`

export default GlobalStyles
