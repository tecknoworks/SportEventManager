import * as signalR from '@microsoft/signalr';
import { Message } from 'features/chat/api/dtos/dtos';

const getJwtToken = () => {
  let token = localStorage.getItem('token') || '';
  return token.replace(/^"|"$/g, '');
};

const connection = new signalR.HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_CHAT_URL || '', {
    accessTokenFactory: () => getJwtToken(),
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const connect = async () => {
  try {
    await connection.start();
  } catch (err) {
    console.error('SignalR Connection Error: ', err);
  }
};

export const sendMessage = async (message: string, chatId: string) => {
  try {
    await connection.invoke('SendMessageToChatGroup', chatId, message);
  } catch (err: any) {
    console.error('SignalR Send Message Error: ', err.toString());
  }
};

export const registerMessageReceived = (callback: (message: Message) => void) => {
  connection.on('ReceiveMessage', callback);
};

export const unregisterMessageReceived = (callback: (message: Message) => void) => {
  connection.off('ReceiveMessage', callback);
};

export const disconnect = async () => {
  try {
    await connection.stop();
  } catch (err) {
    console.error('SignalR Disconnect Error: ', err);
  }
};

export default connection;
