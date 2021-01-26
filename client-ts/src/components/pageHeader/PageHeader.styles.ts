import styled from 'styled-components';

export const PageHeaderStyle = styled.div`
  display: flex;
  position: sticky;
  z-index: 5;
  top: 0;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background-image: linear-gradient(black 80%, transparent);
  margin: 0;
  color: white;
  width: 100%;
  padding: 0 10px 25px 10px;
  border-radius: 0 0 10px 10px;
  
  h1 {
    color: white;
    text-shadow: green;
    padding: 5px;
    max-width: 75%;
  }

  img {
    background-image: radial-gradient(rgb(200, 200, 200), transparent 85%);
    width: 60px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 20px;
    border-radius: 50%;
    -webkit-transition: -webkit-transform 1s ease-in-out;
            transition:         transform 1s ease-in-out;
    :hover {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
`