import { createSlice } from '@reduxjs/toolkit';
import { getProfileThunk } from '../thunks/getProfileThunk';
import { GetUserProfileDto } from 'features/profile/api/dtos';
import { updateProfileThunk } from '../thunks/updateProfileThunk';

type State = {
  isLoading: boolean;
  isSuccess: boolean;
  isDone: boolean;
  error: string;
  profile?: GetUserProfileDto;
};

const initialState: State = {
  isLoading: false,
  isSuccess: false,
  isDone: false,
  error: '',
  profile: undefined,
};

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload as GetUserProfileDto;
    });

    builder.addCase(getProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateProfileThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateProfileThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDone = true;
    });

    builder.addCase(updateProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default profileSlice.reducer;
