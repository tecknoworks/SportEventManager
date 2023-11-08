import { createAsyncThunk } from '@reduxjs/toolkit';
import { LogInDto } from 'features/login/api/dtos';
import { handleGenericError, handleGenericSuccess } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

export const logInThunk = createAsyncThunk('logIn/logInThunk', async (userCredentials: LogInDto, thunkAPI) => {
  try {
    const request = await userService.logInUser(userCredentials);
    const response = await request.data;
    localStorage.setItem('token', JSON.stringify(response));
    handleGenericSuccess('Login successfully.');
    return response;
  } catch (error: any) {
    handleGenericError(error.response.data);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});
