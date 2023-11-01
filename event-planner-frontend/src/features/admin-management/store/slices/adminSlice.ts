import { createSlice } from '@reduxjs/toolkit';
import { getAllUsersThunk } from '../thunks/getAllUsersThunk';
import { deleteUserThunk } from '../thunks/deleteUserThunk';

const initialState = {
  users: [],
  loading: {
    addUser: false,
    editUser: false,
    deleteUser: false,
    sendRecoveryEmail: false,
    getAllUsers: false,
  },
  error: {
    addUser: null as string | null,
    editUser: null as string | null,
    deleteUser: null as string | null,
    sendRecoveryEmail: null as string | null,
    getAllUsers: null as string | null,
  },
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersThunk.pending, (state) => {
      state.loading.getAllUsers = true;
      state.error.getAllUsers = null;
    });
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading.getAllUsers = false;
    });
    builder.addCase(getAllUsersThunk.rejected, (state, action) => {
      state.error.getAllUsers = action.error.message || 'Failed to get users';
      state.loading.getAllUsers = false;
    });

    builder.addCase(deleteUserThunk.pending, (state) => {
      state.loading.deleteUser = true;
      state.error.deleteUser = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
        console.log("merge");
        
      state.users = state.users.filter((user:any) => user.id !== action.payload);
      state.loading.deleteUser = false;
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.error.deleteUser = action.error.message || 'Failed to delete user';
      state.loading.deleteUser = false;
    });
  },
});

export default adminSlice.reducer;
