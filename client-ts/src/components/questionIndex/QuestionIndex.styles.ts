import styled from 'styled-components';

export const QuestionIndexStyle = styled.tr`
  border-radius: 10px;
  outline: none;
  font-weight: 100;
  font-size: 1rem;

  hr {
    width: 75%;
  }

  td {
    padding: 10px;
  }

  :hover {
    box-shadow: 0 0 15px white;
  }

  img {
    width: 15px;
    border-radius: 0;
    :hover {
      width: 20px;
      padding: 0;
    }
  }

  #question {
    font-weight: 400;
  }

  #edit, #delete {
    width: 50px;
  }

  #correct-rate {
    font-size: .75rem;
  }
`