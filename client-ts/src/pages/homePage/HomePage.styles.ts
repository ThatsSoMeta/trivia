import styled from "styled-components";

export const HomePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  * {
    text-decoration: none;
  };

  .button-link {
    background-image: linear-gradient(45deg, black, rgb(50, 50, 50));
    box-shadow: 5px 5px 10px black;
    :hover {
      box-shadow: 5px 5px 10px cyan;
    }
  }

`