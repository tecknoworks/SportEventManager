import { RootState } from 'redux/store';

export const logInStateError = (state: RootState) => state.logIn.error;
export const logInStateLoading = (state: RootState) => state.logIn.loading;
export const logInStateUser = (state: RootState) => state.logIn.user;