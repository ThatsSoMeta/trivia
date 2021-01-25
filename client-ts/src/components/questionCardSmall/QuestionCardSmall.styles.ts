import styled from 'styled-components';

export const QuestionCardSmallStyle = styled.div`
  background-color: rgba(0, 0, 0, .5);
  color: white;
  margin: 15px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  header {
    text-shadow: 2px 2px 3px cyan;
    background-color: rgba(0, 100, 100, .7);
    padding: 1px;
    border-radius: 10px 10px 0 0;
    h2 {
      margin: 5px;
    }
  }
  #content {
    padding: 10px;
    h3 {
      padding: 0 15px;
    }
  }
  #answer {
    font-weight: bold;
    color: lightgreen;
  }
  :hover {
    box-shadow: 0 0 15px white;
  }
`