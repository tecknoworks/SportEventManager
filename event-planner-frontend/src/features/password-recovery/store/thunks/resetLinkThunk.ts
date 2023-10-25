import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ForgotPasswordDto } from 'features/password-recovery/api/dtos';

export const resetLinkThunk = createAsyncThunk(
  'users/resetLink',
  async (requestData: ForgotPasswordDto, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://localhost:7013/api/User/ResetPassword',
        requestData
      );
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
