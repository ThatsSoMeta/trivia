import styled from 'styled-components';

export const ViewQuestionsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  #question-table {
    color: white;
    width: 80%;
  }

  tr {
    cursor: pointer;
  }

  #header-row {
    font-size: 1.5rem;
    background-color: black;
    border-radius: 10px;
  }

  td {
    padding: 10px;
    text-align: center;
    font-size: 2rem;
  }
`