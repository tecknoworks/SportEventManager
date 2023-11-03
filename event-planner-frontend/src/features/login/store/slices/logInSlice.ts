import { createSlice } from '@reduxjs/toolkit';
import { logInThunk } from '../thunks/logInThunk';

type State = {
  loading: boolean;
  error: unknown | null;
  token: string | null;
};

const initialState: State = {
  loading: false,
  error: null as unknown,
  token: localStorage.getItem('token') || null,
};

export const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.loading = false;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
    });
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload;
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message === 'Unable to find the user.') {
        state.error = 'Access denied! Invalid credentials';
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { logout } = logInSlice.actions;
export default logInSlice.reducer;
