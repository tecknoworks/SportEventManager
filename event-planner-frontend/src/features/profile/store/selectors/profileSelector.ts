import { RootState } from 'redux/store';

export const selectProfile = (state: RootState) => state.profilePage.profile;
