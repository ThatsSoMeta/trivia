import styled from 'styled-components';

export const QuestionIndexStyle = styled.tr`
  border-radius: 10px;
  outline: none;

  td {
    padding: 10px;
  }

  :hover {
    box-shadow: 0 0 15px white;
  }

  img {
    padding: 5px;
    width: 35px;
    :hover {
      width: 45px;
      padding: 0;
    }
  }

  #edit, #delete {
    width: 70px;
  }
`