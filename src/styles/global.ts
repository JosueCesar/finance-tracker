import { createGlobalStyle } from "styled-components";
// import theme from "./theme";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;

/*
  // --- BODY ---
  background-color: ${theme.colors.background};
  color: ${theme.colors.darkGrey}
*/