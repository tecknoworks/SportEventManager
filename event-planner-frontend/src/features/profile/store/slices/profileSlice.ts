import { createSlice } from '@reduxjs/toolkit';
import { getProfileThunk } from '../thunks/getProfileThunk';
import { GetUserProfileDto } from 'features/profile/api/dtos';

type State = {
  loading: boolean;
  isSuccess: boolean;
  isDone: boolean;
  error: string;
  profile?: GetUserProfileDto;
};

const initialState: State = {
  loading: false,
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
      state.loading = true;
    });

    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isDone = true;
      state.profile = action.payload as GetUserProfileDto;
    });

    builder.addCase(getProfileThunk.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default profileSlice.reducer;
