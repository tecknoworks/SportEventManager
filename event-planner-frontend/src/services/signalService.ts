import * as signalR from '@microsoft/signalr';

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
    console.log('SignalR Connected.');
  } catch (err) {
    console.error('SignalR Connection Error: ', err);
    setTimeout(connect, 5000);
  }
};

export const registerUnauthorizedAccessHandler = (callback: (message: string) => void) => {
  connection.on('UnauthorizedAccess', callback);
};

export const sendMessage = async (message: string, chatId: string) => {
  try {
    await connection.invoke('SendMessageToChatGroup', chatId, message);
  } catch (err: any) {
    console.error('SignalR Send Message Error: ', err.toString());
  }
};

export const registerMessageReceived = (callback: (userId: string, message: string) => void) => {
  connection.on('ReceiveMessage', callback);
};

export const disconnect = async () => {
  try {
    await connection.stop();
    console.log('SignalR Disconnected.');
  } catch (err) {
    console.error('SignalR Disconnect Error: ', err);
  }
};

export default connection;
