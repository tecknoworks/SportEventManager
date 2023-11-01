import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'services/userService';

const userService: UserService = new UserService();

export const deleteUserThunk = createAsyncThunk('delete/DeleteUser', async (userId: string, thunkAPI) => {
  try {
    console.log(userId);
    await userService.deleteUser(userId);
    return userId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Error occurred');
  }
});
