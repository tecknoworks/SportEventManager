import { createSlice } from '@reduxjs/toolkit';
import { accountConfirmationThunk } from '../thunks/accountConfirmationThunk';

type State = {
  loading: boolean;
  isSuccess: boolean;
  isDone: boolean;
  error: string;
};

const initialState: State = {
  loading: false,
  isSuccess: false,
  isDone: false,
  error: '',
};

const accountConfirmationSlice = createSlice({
  name: 'accountConfirmationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(accountConfirmationThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(accountConfirmationThunk.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
      state.isDone = true;
    });

    builder.addCase(accountConfirmationThunk.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default accountConfirmationSlice.reducer;
