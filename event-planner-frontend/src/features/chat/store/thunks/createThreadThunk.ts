import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from 'services/notificationHandlingService';
import OpenAIService from 'services/openaiService';

const openAIService = new OpenAIService();

export const createThreadThunk = createAsyncThunk('chats/createThread', async (_, { rejectWithValue }) => {
  try {
    const response = await openAIService.createThread();
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return rejectWithValue(error.response?.data || 'An error occured while communicating with the OpenAI service.');
  }
});
