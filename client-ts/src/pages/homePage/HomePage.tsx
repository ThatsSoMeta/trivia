import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {HomePageStyle} from './HomePage.styles'

export const HomePage = () => {
  let history = useHistory()

  const handleClick = (route: string) => {
    history.push(route)
  }

  return (
    <HomePageStyle>
      <h1>The Game</h1>
      <Link
      className='button'
      to='/questions/create'
      onClick={() => handleClick('/create/question')}
      >
        Create Questions
      </Link>
      <Link
      className='button'
      to='/play/trivia'
      onClick={() => handleClick('/play/trivia')}
      >
        Play Game
      </Link>
      <Link
      className='button'
      to='/questions/view'
      onClick={() => handleClick('/view/questions')}
      >
        View Questions
      </Link>
    </HomePageStyle>
  )
}