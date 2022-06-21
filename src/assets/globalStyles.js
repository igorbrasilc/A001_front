import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    transition: 300ms;
    --font-lexend: 'Lexend Deca', sans-serif;
    --font-playball: 'Playball', cursive;
    --color-logo-header: #126BA5;
    --color-button-link: #24CD17;
    --color-border-input: #D4D4D4;
    --color-bg-login-footer: #fff;
    --color-bg-habbit: #F2F2F2;
    --color-check: #8FC549;
    --color-uncheck: #EBEBEB;
    --color-text-grey: #BABABA;
    --color-text-black: #666666;
    --color-input-disabled: #F2F2F2;
    --color-text-input: #AFAFAF;
    --opacity-button-disabled: 0.7;
    --max-height-header: 70px;
    --max-height-footer: 70px;
}
body {
    background-color: var(--color-input-disabled);
}
`;

export default GlobalStyle;
