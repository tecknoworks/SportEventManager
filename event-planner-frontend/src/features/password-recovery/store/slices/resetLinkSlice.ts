import { createSlice } from '@reduxjs/toolkit';
import { resetLinkThunk } from '../thunks/resetLinkThunk';

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

const resetLinkSlice = createSlice({
  name: 'resetLinkSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetLinkThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(resetLinkThunk.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
      state.isDone = true;
    });

    builder.addCase(resetLinkThunk.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default resetLinkSlice.reducer;
