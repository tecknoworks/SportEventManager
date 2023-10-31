import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'services/userService';
import { UserDto } from '../api/Dtos';
import { handleApiError } from 'services/errorHandlingService';

const userService: UserService = new UserService();

export const resetStore_name = 'reset';
export const resetStore = createAction(resetStore_name);

export const createUser = createAsyncThunk('post/createUser', async (initialUser: UserDto, { rejectWithValue }) => {
  try {
    const res = await userService.createUser(initialUser);
    return res.data;
  } catch (error: any) {
    handleApiError(error);
    return rejectWithValue(error.response?.data || 'Error occured');
  }
});
