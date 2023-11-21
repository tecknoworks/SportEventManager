import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateMessage } from 'features/chat/api/dtos/dtos';
import { handleApiError } from 'services/notificationHandlingService';
import OpenAIService from 'services/openaiService';

const openAIService = new OpenAIService();

export const createAssistantMessageThunk = createAsyncThunk(
  'chats/createAssistantMessage',
  async (data: CreateMessage, { rejectWithValue }) => {
    try {
      const response = await openAIService.createMessage(data);
      return response.data.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while communicating with the OpenAI service.');
    }
  }
);
