import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavBarStyle } from './NavBar.styles';

export const NavBar = () => {
  let history = useHistory()

  const handleClick = (route: string) => {
    history.push(route)
  }

  return (
    <NavBarStyle>
      <div className='navButton'>
        <a href='/' onClick={() => handleClick('/')}>
          Home
        </a>
      </div>
      <div className='navButton'>
        <a href='/play/trivia' onClick={() => handleClick('/play/trivia')}>
          Play Trivia!
        </a>
      </div>
      <div className='navButton'>
        <a href='/questions/create' onClick={() => handleClick('/create/question')}>
          New Questions
        </a>
      </div>
      <div className='navButton'>
        <a href='/questions/viewAll' onClick={() => handleClick('/questions/viewAll')}>
          All Questions
        </a>
      </div>
      <div className='navButton'>
        <a href='/questions/retrieve' onClick={() => handleClick('/view/questions')}>
          Open Trivia
        </a>
      </div>
    </NavBarStyle>
  )
}