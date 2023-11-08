import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'services/userService';
import { UserDto } from '../api/Dtos';
import { handleGenericError, handleGenericSuccess } from 'services/notificationHandlingService';
import { BeErrorDto } from 'common/dtos/BeErrorDto';

const userService: UserService = new UserService();

export const resetStore_name = 'reset';
export const resetStore = createAction(resetStore_name);

export const createUser = createAsyncThunk('post/createUser', async (initialUser: UserDto, { rejectWithValue }) => {
  try {
    const res = await userService.createUser(initialUser);
    handleGenericSuccess('Account created successfully');
    return res.data;
  } catch (error: any) {
    const errorDto: BeErrorDto[] = error.response.data as BeErrorDto[];
    errorDto.forEach((e) => {
      handleGenericError(e.description);
    });
    return rejectWithValue(error.response?.data || 'Error occured');
  }
});
