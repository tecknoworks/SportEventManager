import { createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../api/Dtos';
import { createUser } from '../thunks/signupThunks';

const signupPageSlice = createSlice({
  name: 'signuppageSlice',
  initialState: {
    user: null,
    status: 'idle',
    error: null as unknown | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || undefined;
      });
  },
});

export default signupPageSlice.reducer;
