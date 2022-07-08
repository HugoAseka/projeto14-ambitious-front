import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Ubuntu Mono', monospace;
    }
 
   html, body {
        width: 100%;
        height: 100%;
        background-color: #FFEFD5;
        
    }
`;

export default GlobalStyle;
