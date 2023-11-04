import { createSlice } from '@reduxjs/toolkit';
import { getAllUsersThunk } from '../thunks/getAllUsersThunk';
import { deleteUserThunk } from '../thunks/deleteUserThunk';
import { sendRecoverPasswordEmailThunk } from '../thunks/sendRecoverPasswordEmailthunk';
import { editUserOrAdminThunk } from '../thunks/editUserOrAdminThunk';
import { createUserOrAdminThunk } from '../thunks/createUserOrAdminThunk';

const initialState = {
  users: [] as any[],
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
      state.users = state.users.filter((user: any) => user.userId !== action.payload);
      state.loading.deleteUser = false;
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.error.deleteUser = action.error.message || 'Failed to delete user';
      state.loading.deleteUser = false;
    });

    builder.addCase(sendRecoverPasswordEmailThunk.pending, (state) => {
      state.loading.sendRecoveryEmail = true;
      state.error.sendRecoveryEmail = null;
    });
    builder.addCase(sendRecoverPasswordEmailThunk.fulfilled, (state) => {
      state.loading.sendRecoveryEmail = false;
    });
    builder.addCase(sendRecoverPasswordEmailThunk.rejected, (state, action) => {
      state.error.sendRecoveryEmail = action.error.message || 'Failed to send recovery email';
      state.loading.sendRecoveryEmail = false;
    });

    builder.addCase(editUserOrAdminThunk.pending, (state) => {
      state.loading.editUser = true;
      state.error.editUser = null;
    });
    builder.addCase(editUserOrAdminThunk.fulfilled, (state, action) => {
      state.loading.editUser = false;
    });
    builder.addCase(editUserOrAdminThunk.rejected, (state, action) => {
      let errorMessage = 'Failed to create user or admin'; // Default message
      if (action.payload && Array.isArray(action.payload) && action.payload[0]?.description) {
        errorMessage = action.payload[0].description; // Get message from payload if available
      } else if (action.error?.message) {
        errorMessage = action.error.message; // Fallback to error message from Redux Toolkit
      }
      state.error.editUser = errorMessage;
      state.loading.editUser = false;
    });

    builder.addCase(createUserOrAdminThunk.pending, (state) => {
      state.loading.addUser = true;
      state.error.addUser = null;
    });
    builder.addCase(createUserOrAdminThunk.fulfilled, (state, action) => {
      // state.users.push(action.payload); 
      state.loading.addUser = false;
    });
    builder.addCase(createUserOrAdminThunk.rejected, (state, action: { payload: any; error: any }) => {
      let errorMessage = 'Failed to create user or admin'; // Default message
      if (action.payload && Array.isArray(action.payload) && action.payload[0]?.description) {
        errorMessage = action.payload[0].description; // Get message from payload if available
      } else if (action.error?.message) {
        errorMessage = action.error.message; // Fallback to error message from Redux Toolkit
      }
      state.error.addUser = errorMessage;
      state.loading.addUser = false;
    });


  },
});

export default adminSlice.reducer;
