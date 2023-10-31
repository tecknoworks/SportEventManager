import { RootState } from 'redux/store';

export const selectNewPasswordLoadingState = (state: RootState) => state.newPasswordPage.loading;

export const selectNewPasswordIsSuccess = (state: RootState) => state.newPasswordPage.isSuccess;

export const selectNewPasswordIsDone = (state: RootState) => state.newPasswordPage.isDone;
