import styled from "styled-components";

export const QuizGameStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  border: 2px solid red;
  width: 100%;

  > p {
    color: white;
  }

  .score {
    color: white;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    background-image: linear-gradient(180deg, white, blue);
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

  .start,
  .next {
    backgroud: linear-gradient(180deg, cyan, limegreen);
    margin: 20px;
  }

  .start {
      mad-width: 400px
  }

  #game-options {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
  }

  #difficulty-selector {
    box-shadow: 5px 5px 5px cyan;
    background-color: black;
    padding: 0 10px 10px 10px;
  }
`;
