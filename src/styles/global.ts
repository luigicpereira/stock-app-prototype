import { createGlobalStyle } from "styled-components";
import colors from "./colors";

import "./fonts.css";

export default createGlobalStyle`
  #root {
    display: flex;
    flex-direction: row;

    min-height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${colors.gray001};
    color: ${colors.gray003};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Graphik', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
    border: 0;
    background: none;
  }

`;
