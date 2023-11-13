import { RootState } from 'redux/store';

export const joinEventLoadingState = (state: RootState) => state.joinEvent.isLoading;

export const joinEventIsSuccess = (state: RootState) => state.joinEvent.isSuccess;

export const joinEventIsDone = (state: RootState) => state.joinEvent.isDone;

export const joinEventError = (state: RootState) => state.joinEvent.error;
