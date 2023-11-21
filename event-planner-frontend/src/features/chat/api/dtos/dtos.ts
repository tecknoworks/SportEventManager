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

export interface CreateMessage {
  assistantId: string;
  threadId: string;
  userQuestion: string;
}

export interface OpenAIMessage {
  id: string;
  object: string;
  created_at: number;
  thread_id: string;
  role: string;
  content: [
    {
      type: string;
      text: {
        value: string;
        annotations: [];
      };
    },
  ];
  file_ids: [];
  assistant_id: string;
  run_id: string;
  metadata: {};
}
