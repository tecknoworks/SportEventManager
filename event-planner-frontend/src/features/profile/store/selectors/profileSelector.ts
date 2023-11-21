import { RootState } from 'redux/store';

export const selectProfile = (state: RootState) => state.profilePage.profile;
export const selectProfileIsDone = (state: RootState) => state.profilePage.isDone;
export const selectProfileIsSuccess = (state: RootState) => state.profilePage.isSuccess;
export const selectProfileIsLoading = (state: RootState) => state.profilePage.isLoading;
export const selectUserRating =(state: RootState)=>state.profilePage.averageRating;