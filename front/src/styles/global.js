import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0; 
    font-family: 'Montserrat', sans-serif; 
  }

  body {
    width: 100vw;
    height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #faebd7;
  }
`;

export default Global;
