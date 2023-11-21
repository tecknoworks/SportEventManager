import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getChatsDetailsThunk } from '../thunks/getChatsDetailsThunk';
import { ChatDetails, GetMessagesResponse, Message, OpenAIMessage } from 'features/chat/api/dtos/dtos';
import { getChatsMessagesThunk } from '../thunks/getChatMessagesThunk';
import { getThreadMessagesThunk } from '../thunks/getThreadMessagesThunk';
import { createAssistantMessageThunk } from '../thunks/createMessageThunk';
import { stat } from 'fs';

export type AddMessagePaylod = {
  chatId: string;
  message: Message;
};

export type AddAssistantChatMessagePaylod = {
  message: OpenAIMessage;
};

type State = {
  chatsDetails: ChatDetails[];
  isLoading: boolean;
  error: string;
  chatMessages: { [chatId: string]: Message[] };
  hasMoreMessages: { [chatId: string]: boolean };
  assistantMessages: OpenAIMessage[];
};

const initialState: State = {
  chatsDetails: [],
  chatMessages: {},
  assistantMessages: [],
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
    addAssistantChatMessage: (state, action: PayloadAction<AddAssistantChatMessagePaylod>) => {
      const { message } = action.payload;
      state.assistantMessages = [...state.assistantMessages, message];
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

    builder.addCase(getThreadMessagesThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getThreadMessagesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.assistantMessages = (action.payload as OpenAIMessage[]).sort((a, b) => a.created_at - b.created_at);
    });

    builder.addCase(getThreadMessagesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createAssistantMessageThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createAssistantMessageThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.assistantMessages = (action.payload as OpenAIMessage[]).sort((a, b) => a.created_at - b.created_at);
    });

    builder.addCase(createAssistantMessageThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addMessage, addAssistantChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
