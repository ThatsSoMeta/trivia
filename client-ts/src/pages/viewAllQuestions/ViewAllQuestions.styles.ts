import styled from 'styled-components';

export const ViewQuestionsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  #question-table {
    color: white;
    min-width: 80%;
    margin: 10px;
    tr:nth-child(even) {
      background-color: rgb(35, 35, 35);
    }
    tr:nth-child(odd) {
      background-color: rgb(30, 30, 30);
    }
  }

  tr {
    cursor: pointer;
  }

  th {
    font-size: 1rem;
    background-color: black;
    border-radius: 10px;
    padding: 10px;
  }

  td {
    padding: 10px;
    text-align: center;
  }

  #difficulty {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

`