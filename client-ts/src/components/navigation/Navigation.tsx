import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { QuizGame, CreateQuestionsPage, HomePage, ViewQuestionsPage, EditQuestionsPage } from '../../pages';

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
        path='/questions/create'
        component={CreateQuestionsPage}
      />
      <Route
        path='/questions/viewAll'
        component={ViewQuestionsPage}
      />
      <Route
        path='/questions/edit/:questionID'
        component={EditQuestionsPage}
      />
    </BrowserRouter>
  )
}