import { RootState } from 'redux/store';

export const selectUser = (state: RootState) => state.signupPage.user;
export const selectUserStatus = (state: RootState) => state.signupPage.status;
export const selectUserError = (state: RootState) => state.signupPage.error;
export const selectSignupLoader = (state: RootState) => state.signupPage.isLoading;
