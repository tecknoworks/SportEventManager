import { createSlice } from '@reduxjs/toolkit';
import { createUser, resetStore } from '../thunks/signupThunks';
import { BeErrorDto } from 'common/dtos/BeErrorDto';

type State = {
  user: object | null;
  status: string;
  error: BeErrorDto[];
  isLoading: boolean;
};

const initialState: State = {
  user: null,
  status: 'idle',
  error: [],
  isLoading: false,
};

const signupPageSlice = createSlice({
  name: 'signupPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as BeErrorDto[];
        state.isLoading = false;
      })
      .addCase(resetStore, () => initialState);
  },
});

export default signupPageSlice.reducer;
