import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  body {
    background-color: #f5f5f5;
    font-family: 'Roboto', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;