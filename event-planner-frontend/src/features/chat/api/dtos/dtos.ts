export interface ChatDetails {
  id: string;
  name: string;
  imageUrl: string;
  participantsCount: number;
}

export interface Message {
  id: string;
  username: string;
  chatId: string;
  userId: string;
  messageText: string;
  date: string;
}

export interface GetMessagesResponse {
  messages: Message[];
  chatId: string;
  totalCount: number;
}
