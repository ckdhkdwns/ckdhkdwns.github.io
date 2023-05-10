import { createGlobalStyle } from "styled-components"
import "fontsource-noto-sans-kr";
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }
  
  body {
    font-family: 'Pretendard-Regular', sans-serif;
    word-spacing: 0.1rem;
    font-weight: 400;

    background: ${props => props.theme.colors.bodyBackground};
  }

`

export default GlobalStyles
