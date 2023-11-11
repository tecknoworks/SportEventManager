import { RootState } from 'redux/store';

export const selectChatsDetails = (state: RootState) => state.chatPage.chatsDetails;
export const selectChatMessages = (state: RootState) => state.chatPage.chatMessages;
export const selectChatsDetailsIsLoading = (state: RootState) => state.chatPage.isLoading;
