import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import RouterComponent from 'app/router/Router'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterComponent />
        </QueryClientProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
