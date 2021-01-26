import styled from 'styled-components';

export const NavBarStyle = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;

  a {
    text-decoration: none;
    font-size: 1rem;
    color: white;
    :hover {
      color: cyan;
    }
  }

  .navButton {
    flex-basis: 20%;
  }
`