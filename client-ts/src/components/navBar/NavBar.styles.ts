import styled from 'styled-components';

export const NavBarStyle = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: white;
    :hover {
      color: cyan;
    }
  }

  .navButton {
    flex-basis: 20%;
  }
`