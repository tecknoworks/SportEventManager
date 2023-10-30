import { RootState } from 'redux/store';

export const selectLogInStateError = (state: RootState) => state.logIn.error;
export const selectLogInStateLoading = (state: RootState) => state.logIn.loading;
export const selectLogInStateUser = (state: RootState) => state.logIn.user;