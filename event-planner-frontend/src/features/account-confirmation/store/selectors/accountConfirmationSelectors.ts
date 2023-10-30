import { RootState } from 'redux/store';

export const selectAccountConfirmationLoadingState = (state: RootState) => state.confirmAccount.loading;

export const selectAccountConfirmationIsSuccess = (state: RootState) => state.confirmAccount.isSuccess;

export const selectAccountConfirmationIsDone = (state: RootState) => state.confirmAccount.isDone;
