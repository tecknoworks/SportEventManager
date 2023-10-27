import { createSlice } from '@reduxjs/toolkit';
import { newPasswordThunk } from '../thunks/newPasswordThunk';

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

const newPasswordSlice = createSlice({
  name: 'newPasswordSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newPasswordThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(newPasswordThunk.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
      state.isDone = true;
    });

    builder.addCase(newPasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default newPasswordSlice.reducer;
