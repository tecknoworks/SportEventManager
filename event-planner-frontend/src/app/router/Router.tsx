import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'features/homepage/HomePage';
import NotFound from 'features/static-pages/NotFound';
import Layout from './Layout';
import SignUpPage from 'features/registration/views/SignUpPage';
import App from 'App';
import PasswordRecoveryPage from 'features/password-recovery/views/PasswordRecoveryPage';
import CreateNewPasswordPage from 'features/password-recovery/views/CreateNewPasswordPage';
import LoginPage from 'features/login/LoginPage';

const RouterComponent: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="recover-password" element={<PasswordRecoveryPage />} />
        <Route path="reset-password" element={<CreateNewPasswordPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouterComponent;
