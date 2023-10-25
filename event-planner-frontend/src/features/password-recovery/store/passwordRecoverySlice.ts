import { createSlice } from '@reduxjs/toolkit';
import { resetLinkThunk } from './thunks/resetLinkThunk';

const passwordRecoverySlice = createSlice({
  name: 'passwordRecoverySlice',
  initialState: {
    loading: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetLinkThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(resetLinkThunk.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });

    builder.addCase(resetLinkThunk.rejected, (state) => {
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export default passwordRecoverySlice.reducer;
