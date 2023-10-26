import { createAction, createSlice } from '@reduxjs/toolkit';
import { createUser, resetStore } from '../thunks/signupThunks';
import { BeErrorDto } from 'common/dtos/BeErrorDto';

type State = {
  user: object | null;
  status: string;
  error: BeErrorDto[];
};

const initialState: State = {
  user: null,
  status: 'idle',
  error: [],
};

const clearState = createAction('clearState');

const signupPageSlice = createSlice({
  name: 'signupPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as BeErrorDto[];
      })
      .addCase(resetStore, () => initialState);
  },
});

export default signupPageSlice.reducer;
