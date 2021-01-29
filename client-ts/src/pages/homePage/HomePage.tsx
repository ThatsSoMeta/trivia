import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { HomePageStyle } from './HomePage.styles'

export const HomePage = () => {
  let history = useHistory()

  const handleClick = (route: string) => {
    history.push(route)
  }

  return (
    <HomePageStyle>
      <h1>The Game</h1>
      <Link
      className='button-link button'
      to='/questions/create'
      onClick={() => handleClick('/questions/create')}
      >
        Create Questions
      </Link>
      <Link
      className='button-link button'
      to='/play/trivia'
      onClick={() => handleClick('/play/trivia')}
      >
        Play Game
      </Link>
      <Link
      className='button-link button'
      to='/questions/viewAll'
      onClick={() => handleClick('/questions/viewAll')}
      >
        View Questions
      </Link>
    </HomePageStyle>
  )
}