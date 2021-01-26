import styled, { createGlobalStyle } from "styled-components";

export const EditQuestionPageStyle = createGlobalStyle`
  h1 {
    text-shadow: 2px 2px 5px black;
  }

  header {
    padding: 0 30px;
  }
`

export const EditQuestionStyle = styled.div`
  background-color: rgba(0, 0, 0, .75);
  color: white;
  text-shadow: 2px 2px 5px black;
  margin: 20px;
  border-radius: 10px;
  padding: 10px 30px;
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;

  label {
    margin: 5px;
    padding: 5px;
  }

  .field-label {
    font-size: 1.5rem;
    line-height: 3rem;
  }

  #easy, #true {
    background-image: linear-gradient(45deg, darkgreen, limegreen);
  }

  #medium {
    background-image: linear-gradient(45deg, orange, yellow);
  }

  #hard, #false {
    background-image: linear-gradient(45deg, darkred, red);
  }

  button, .button {
    background-image: linear-gradient(45deg, navy 40%, blue);
    color: white;
    text-shadow: 2px 2px 5px black;
    margin: 10px;
    outline: none;
    cursor: pointer;
    :hover {
      box-shadow: 0 0 15px cyan
    }
  }

  h2 {
    font-size: 2rem;
    text-shadow: 2px 2px 5px black;
    color: white
  }

  .question-input {
    width: 100%;
    background-color: rgba(200, 200, 200, .2);
    font-size: 1rem;
    margin: 10px;
    color: white;
    border: none;
    border-radius: 10px;
    height: 2.5rem;
    text-align: center;
    padding: 10px;
    outline: none;
    cursor: pointer;
    :active, :hover, :focus {
      box-shadow: 0 0 15px white;
    }
  }

  #question {
    height: 6rem;
  }

  #correct-answer,
  #incorrect-answer {
    width: 40%;
  }

  #category {
    margin-top: 20px;
    height: 3rem;
    width: 40%;
  }

  #correct-answer: focus,
  #correct-answer: hover {
    box-shadow: 0 0 15px lightgreen
  }

  #incorrect-answer: focus,
  #incorrect-answer: hover {
    box-shadow: 0 0 15px red
  }
`