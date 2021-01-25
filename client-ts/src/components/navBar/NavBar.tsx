import React from 'react';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import { NavBarStyle } from './NavBar.styles';

export const NavBar = () => {
  let history = useHistory()

  const handleClick = (route: string) => {
    history.push(route)
  }

  return (
    <NavBarStyle>
      <a href='/' onClick={() => handleClick('/')}>
        Home
      </a>
      <a href='/play/trivia' onClick={() => handleClick('/play/trivia')}>
        Play Trivia!
      </a>
      <a href='/create/question' onClick={() => handleClick('/create/question')}>
        Create New Questions
      </a>
      <a href='/view/questions' onClick={() => handleClick('/view/questions')}>
        View All Questions
      </a>
    </NavBarStyle>
  )
}