import { RootState } from 'redux/store';

export const selectAllUsers = (state: RootState) => state.adminPage.users
export const selectAdminStateError = (state: RootState) => state.adminPage.error
export const selectAdminStateLoading = (state: RootState) => state.adminPage.loading