import React from 'react';
import { NavBar } from '../';
import { PageHeaderStyle } from './PageHeader.styles';

export const PageHeader = () => {
  return (
    <PageHeaderStyle>
      <h1>Header</h1>
      <NavBar />
    </PageHeaderStyle>
  )
}