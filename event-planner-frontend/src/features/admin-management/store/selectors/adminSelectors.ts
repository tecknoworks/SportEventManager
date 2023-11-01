import { RootState } from 'redux/store';

export const selectAllUsers = (state: RootState) => state.adminPage.users
