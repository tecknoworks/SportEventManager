import { RootState } from 'redux/store';

export const selectEventSportTypes = (state: RootState) => state.eventPage.sportTypes;
export const selectEventPositions = (state: RootState) => state.eventPage.positions;
export const selectCurrentEvent = (state: RootState) => state.eventPage.currentEvent;
