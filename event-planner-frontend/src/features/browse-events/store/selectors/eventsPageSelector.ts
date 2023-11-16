import { RootState } from 'redux/store';

export const selectEvents = (state: RootState) => state.browseEventsPage.eventsResponse;

export const joinEventLoadingState = (state: RootState) => state.browseEventsPage.isLoading;

export const joinEventIsSuccess = (state: RootState) => state.browseEventsPage.isSuccess;

export const joinEventIsDone = (state: RootState) => state.browseEventsPage.isDone;

export const joinEventError = (state: RootState) => state.browseEventsPage.error;

export const deleteParticipanttIsSuccess = (state: RootState) => state.browseEventsPage.isDeleteSuccess;
