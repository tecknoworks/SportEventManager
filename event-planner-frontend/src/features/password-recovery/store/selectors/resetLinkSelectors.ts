import { RootState } from 'redux/store';

export const selectResetLinkLoadingState = (state: RootState) => state.resetLinkPage.loading;

export const selectResetLinkIsSuccess = (state: RootState) => state.resetLinkPage.isSuccess;

export const selectResetLinkIsDone = (state: RootState) => state.resetLinkPage.isDone;

export const selectResetLinkError = (state: RootState) => state.resetLinkPage.error;
