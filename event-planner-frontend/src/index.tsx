import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import RouterComponent from 'app/router/Router'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterComponent />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
