import { RootState } from 'redux/store';

export const selectJoinedEventsStateError = (state: RootState) => state.joinedEventsPage.error;
export const selectJoinedEventsLoading = (state: RootState) => state.joinedEventsPage.loading;
export const selectJoinedEvents = (state: RootState) => state.joinedEventsPage.events;