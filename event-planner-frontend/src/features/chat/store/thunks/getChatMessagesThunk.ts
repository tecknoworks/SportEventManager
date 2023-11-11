import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from 'services/chatService';
import { handleApiError } from 'services/notificationHandlingService';

const chatService = new ChatService();

export const getChatsMessagesThunk = createAsyncThunk(
  'chats/getChatsMessages',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await chatService.getChatMessages(chatId);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while getting the chat messages.');
    }
  }
);
