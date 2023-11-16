import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from 'services/chatService';
import { handleApiError } from 'services/notificationHandlingService';

const chatService = new ChatService();

export type GetMessagesRequest = {
  chatId: string;
  pageNumber: number;
  pageSize: number;
};

export const getChatsMessagesThunk = createAsyncThunk(
  'chats/getChatsMessages',
  async ({ chatId, pageNumber, pageSize }: GetMessagesRequest, { rejectWithValue }) => {
    try {
      const response = await chatService.getChatMessages(chatId, pageNumber, pageSize);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while getting the chat messages.');
    }
  }
);
