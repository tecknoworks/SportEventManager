import { Message } from './message';

export type ChatDetails = {
  id: string;
  name: string;
  lastMessage: Message;
  imageUrl: string;
  participantsCount: number;
};
