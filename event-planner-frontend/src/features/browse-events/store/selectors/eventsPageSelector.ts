import { RootState } from 'redux/store';

export const selectEvents = (state: RootState) => state.browseEventsPage.eventsResponse;
