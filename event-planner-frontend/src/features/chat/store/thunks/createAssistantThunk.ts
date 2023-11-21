import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateAssistant } from 'features/chat/api/dtos/dtos';
import { handleApiError } from 'services/notificationHandlingService';
import OpenAIService from 'services/openaiService';

const openAIService = new OpenAIService();

export const createAssistantThunk = createAsyncThunk(
  'chats/createAssistant',
  async (data: CreateAssistant, { rejectWithValue }) => {
    try {
      const response = await openAIService.createAssistant(data);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while communicating with the OpenAI service.');
    }
  }
);
