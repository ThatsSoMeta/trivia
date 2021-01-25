import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QuizGame, CreateQuestionsPage, HomePage, ViewQuestionsPage } from '../../pages';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Route
        exact
        path='/'
        component={HomePage}
      />
      <Route
        path='/play/trivia'
        component={QuizGame}
      />
      <Route
        path='/create/question'
        component={CreateQuestionsPage}
      />
      <Route
        path='/view/questions'
        component={ViewQuestionsPage}
      />
    </BrowserRouter>
  )
}