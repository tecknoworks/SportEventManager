import { RootState } from 'redux/store';

export const selectChatsDetails = (state: RootState) => state.chatPage.chatsDetails;
export const selectChatMessages = (state: RootState, chatId: string) => state.chatPage.chatMessages[chatId];
export const selectChatHasMore = (state: RootState, chatId: string) => state.chatPage.hasMoreMessages[chatId];
export const selectChatsDetailsIsLoading = (state: RootState) => state.chatPage.isLoading;
export const selectChatsAssistantMessages = (state: RootState) => state.chatPage.assistantMessages;
