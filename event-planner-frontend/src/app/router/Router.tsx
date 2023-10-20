import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from 'features/homepage/HomePage'
import NotFound from 'features/static-pages/NotFound'
import Layout from './Layout'
import SignUpPage from 'features/registration/SignUpPage'
import App from 'App'

const RouterComponent: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="test" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default RouterComponent
