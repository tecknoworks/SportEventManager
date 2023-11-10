import { RootState } from 'redux/store';

export const selectEventDetailsError = (state: RootState) => state.detailsPage.error;
export const selectEventDetails = (state: RootState) => state.detailsPage.eventDetails;
export const selectEventLoading = (state: RootState) => state.detailsPage.loading;