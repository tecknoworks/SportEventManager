import { RootState } from 'redux/store';

export const selectResetLinkLoadingState = (state: RootState) => state.resetLink.loading;

export const selectResetLinkIsSuccess = (state: RootState) => state.resetLink.isSuccess;

export const selectResetLinkIsDone = (state: RootState) => state.resetLink.isDone;

export const selectResetLinkError = (state: RootState) => state.resetLink.error;
