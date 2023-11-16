import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getChatsDetailsThunk } from '../thunks/getChatsDetailsThunk';
import { ChatDetails, GetMessagesResponse, Message } from 'features/chat/api/dtos/dtos';
import { getChatsMessagesThunk } from '../thunks/getChatMessagesThunk';

export type AddMessagePaylod = {
  chatId: string;
  message: Message;
};

type State = {
  chatsDetails: ChatDetails[];
  isLoading: boolean;
  error: string;
  chatMessages: { [chatId: string]: Message[] };
  hasMoreMessages: { [chatId: string]: boolean };
};

const initialState: State = {
  chatsDetails: [],
  chatMessages: {},
  hasMoreMessages: {},
  isLoading: false,
  error: '',
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<AddMessagePaylod>) => {
      const { chatId, message } = action.payload;
      if (!state.chatMessages[chatId]) {
        state.chatMessages[chatId] = [];
      }
      state.chatMessages[chatId].push(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsDetailsThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getChatsDetailsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chatsDetails = action.payload as ChatDetails[];
    });

    builder.addCase(getChatsDetailsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getChatsMessagesThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getChatsMessagesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      const { chatId, messages, totalCount } = action.payload as GetMessagesResponse;
      const existingMessages = state.chatMessages[chatId] || [];
      state.chatMessages[chatId] = [...messages, ...existingMessages];
      state.hasMoreMessages[chatId] = existingMessages.length + messages.length < totalCount;
    });

    builder.addCase(getChatsMessagesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
