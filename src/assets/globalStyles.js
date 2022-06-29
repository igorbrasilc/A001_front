import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import '../../node_modules/react-agenda/build/styles.css';
@import '../../node_modules/react-datetime/css/react-datetime.css';

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
