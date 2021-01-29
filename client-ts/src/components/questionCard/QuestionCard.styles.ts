import styled from 'styled-components';
// import BGImage from './images/IMA_sunset.jpg';

export const QuestionStyle = styled.div`
  background-color: black;
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  text-align: center;
  font-size: 1.5rem;

  h1 {
    font-size: 8rem
  }
  #answer-field {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  `

  type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
  };

  export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  text-align: center;
  margin: 10px;
  min-width: 20%;

  button {
    font-size: 1.5rem;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    background-image: ${({ correct, userClicked}) =>
      correct ?
      'linear-gradient(10deg, darkgreen 40%, limegreen)' :
      !correct && userClicked ?
      'linear-gradient(10deg, darkred 40%, red)' :
      null
    };
    :disabled {
      :hover {
        box-shadow: none;
      }
    }
  }
  
  `