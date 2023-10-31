import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LogInDto } from 'features/login/api/dtos';
import UserService from 'services/userService';

const userService = new UserService();

export const logInThunk = createAsyncThunk('logIn/logInThunk', async (userCredentials: LogInDto, thunkAPI) => {
  try {
    const request = await userService.logInUser(userCredentials);
    const response = await request.data;
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
});
