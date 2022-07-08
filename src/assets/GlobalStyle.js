import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Ubuntu Mono', monospace;
    }
 
   html, body {
        width: 100%;
        height: 100%;
        background-color: #fafafafa;
        /* display:flex;
        justify-content:center;
        align-items:initial; */
    }
`;

export default GlobalStyle;
