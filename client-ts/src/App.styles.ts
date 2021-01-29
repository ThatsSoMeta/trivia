import styled, { createGlobalStyle } from 'styled-components';


export const AppStyle = createGlobalStyle`
    :root {
        background-color: rgb(50, 50, 50);
        padding: 0;
        font-family: 'Josefin Sans', sans-serif;
    }

    #root {
        width: 100%;
    }

    h1, h2 {
        color: white;
        font-family: 'Londrina Solid', cursive;
        letter-spacing: .4rem;
        font-weight: 100;
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
        ::-webkit-scrollbar {
            background-image: linear-gradient(black 13%, transparent 18%);
            width: 1em;
        };
        ::-webkit-scrollbar-thumb {
            background-color: rgba(200, 0, 200, .3);
            border-radius: .5em;
            box-shadow: 2px 2px 5px black;
        }
    }

    * {
        box-sizing: border-box;
        border-radius: 5px;
        outline: none;
    }

    button, .button {
        background-image: linear-gradient(45deg, black, rgb(70, 70, 70));
        font-family: 'Londrina Solid', cursive;
        letter-spacing: .1rem;
        color: white;
        text-transform: capitalize;
        text-shadow: 2px 2px 5px black;
        margin: 10px;
        padding: 8px;
        cursor: pointer;
        :hover {
          box-shadow: 0 0 15px cyan;
        };
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
`