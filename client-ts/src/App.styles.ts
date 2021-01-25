import styled, { createGlobalStyle } from 'styled-components';


export const AppStyle = createGlobalStyle`
    :root {
        background-color: rgb(50, 50, 50);
        padding: 0;
        font-family: 'Annie Use Your Telescope', cursive;
    }

    #root {
        width: 100%;
    }

    h2, h2 {
        color: white;
    }

    html {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        height: auto;
    }

    * {
        box-sizing: border-box;
        border-radius: 10px;
        outline: none;
    }

    button, .button {
        text-transform: capitalize;
        margin: 5px;
        padding: 10px;
        border-radius: 10px;
        font-weight: bold;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: white;
    }

    .score {
        color: white;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        background-image: linear-gradient(45deg, green, yellow, red);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px gray);
        font-size: 70px;
        font-weight: 400;
        text-align: center;
        margin: 20px;
    }
`