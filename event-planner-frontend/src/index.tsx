import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RouterComponent from 'app/router/Router';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from 'theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
