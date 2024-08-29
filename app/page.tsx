
import React from 'react';
import {NextUIProvider} from "@nextui-org/system";

import LandingPage from './components/LandingPage/LandingPage'

const MainPage: React.FC = () => {

  return (
    <NextUIProvider>
      <main>
        <LandingPage />
      </main>
    </NextUIProvider>
  );
};

export default MainPage;

