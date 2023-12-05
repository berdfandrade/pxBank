import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import MainPage from './MainPage/MainPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainPage/>
    </ChakraProvider>
  );
}

export default App;
