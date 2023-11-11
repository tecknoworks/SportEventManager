import { createSlice } from '@reduxjs/toolkit';
import { getChatsDetailsThunk } from '../thunks/getChatsDetailsThunk';
import { ChatDetails, Message } from 'features/chat/api/dtos/dtos';
import { getChatsMessagesThunk } from '../thunks/getChatMessagesThunk';

type State = {
  chatsDetails: ChatDetails[];
  isLoading: boolean;
  error: string;
  chatMessages: Message[];
};

const initialState: State = {
  chatsDetails: [],
  chatMessages: [],
  isLoading: false,
  error: '',
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {},
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
      state.chatMessages = action.payload as Message[];
    });

    builder.addCase(getChatsMessagesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default chatSlice.reducer;
