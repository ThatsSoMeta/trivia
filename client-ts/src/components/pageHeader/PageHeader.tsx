import React from 'react';
import { NavBar } from '../';
import { PageHeaderStyle } from './PageHeader.styles';
import TriviaLogo from '../../images/trivia-logo.png';

export const PageHeader = () => {
  return (
    <PageHeaderStyle>
      <h1>What Do You Know?</h1>
      <img src={TriviaLogo} alt='logo' />
      <NavBar />
    </PageHeaderStyle>
  )
}