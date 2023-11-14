export interface ChatDetails {
  id: string;
  name: string;
  imageUrl: string;
  participantsCount: number;
}

export interface Message {
  username: string;
  chatId: string;
  userId: string;
  messageText: string;
  date: string;
}

export interface GetMessagesResponse {
  messages: Message[];
  chatId: string;
}
