import styled from "styled-components";

export const QuizGameStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
  margin-top: 50px;

  > p {
    color: white;
  }

  .score {
    color: white;
    font-size: 2rem;
    margin: 0;
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

  .quiz-selector {
    box-shadow: 5px 5px 5px cyan;
    background-color: black;
    padding: 0 10px 10px 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
  }

  .options {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 10px;
    input, label {
      margin: 5px;
    }
  }
`;
