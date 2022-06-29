import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    transition: 300ms;
    --font-lexend: 'Lexend Deca', sans-serif;
    --color-logo-header: #0E5400;
    --color-button-link: #24CD17;
}

body {
    background-color: var(--color-input-disabled);
}
`;

export default GlobalStyle;
