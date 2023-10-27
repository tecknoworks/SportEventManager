import { RootState } from 'redux/store';

export const selectNewPasswordLoadingState = (state: RootState) => state.newPassword.loading;

export const selectNewPasswordIsSuccess = (state: RootState) => state.newPassword.isSuccess;

export const selectNewPasswordIsDone = (state: RootState) => state.newPassword.isDone;
