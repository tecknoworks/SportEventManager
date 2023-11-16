import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from 'services/chatService';
import { handleApiError } from 'services/notificationHandlingService';

const chatService = new ChatService();

export const getChatsDetailsThunk = createAsyncThunk('chats/getChatsDetails', async (_, { rejectWithValue }) => {
  try {
    const response = await chatService.getChatsDetails();
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return rejectWithValue(error.response?.data || 'An error occured while getting the chats details.');
  }
});
