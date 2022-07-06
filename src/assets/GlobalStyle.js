import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
 
   html, body {
        width: 100%;
        height: 100%;
        font-family: 'Roboto', sans-serif;
        background-color: #fafafafa;
        /* display:flex;
        justify-content:center;
        align-items:initial; */
    }
`;

export default GlobalStyle;