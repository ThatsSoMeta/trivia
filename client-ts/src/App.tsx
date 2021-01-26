import React from "react";
import { AppStyle, Wrapper } from "./App.styles";
import { Navigation, PageHeader } from './components';

const App = () => {

  return (
    <>
        <AppStyle />
        <PageHeader />
        <Wrapper>
          <Navigation />
        </Wrapper>
    </>
  );
};

export default App;
