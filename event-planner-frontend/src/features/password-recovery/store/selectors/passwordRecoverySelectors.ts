import { RootState } from 'redux/store';

export const selectLoadingState = (state: RootState) =>
  state.passwordRecovery.loading;

export const selectIsSuccess = (state: RootState) =>
  state.passwordRecovery.isSuccess;
