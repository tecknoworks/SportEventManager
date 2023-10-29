import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LogInDto } from 'features/login/api/dtos';

export const logInThunk = createAsyncThunk('logIn/logInThunk', async (userCredentials: LogInDto, thunkAPI) => {
  try{
    const request = await axios.post('https://localhost:7013/api/User/Login', userCredentials);
    const response = await request.data;
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  }catch(error:any){
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
});
