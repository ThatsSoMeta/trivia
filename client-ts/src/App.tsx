import React, { useState } from "react";
import { AppStyle, Wrapper } from "./App.styles";
import { Navigation, PageHeader } from './components';

const App = () => {
  const [option, setOption] = useState("");

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
