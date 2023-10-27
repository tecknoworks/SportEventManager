import { createSlice } from '@reduxjs/toolkit';
import { logInThunk } from '../thunks/logInThunk';

export const logInSlice = createSlice({
  name: 'logIn',
  initialState: {
    loading: false,
    user: null,
    error: null as unknown,
  },
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInThunk.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      console.log(action.error.message);
      if (action.error.message === 'Unable to find the user.') {
        state.error = 'Access denied! Invalid credentials';
      } else {
        state.error = action.error.message;
      }
    });
  },
});


export const { logout } = logInSlice.actions
export default logInSlice.reducer;

