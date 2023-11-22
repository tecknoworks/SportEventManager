import * as signalR from '@microsoft/signalr';
import { Message } from 'features/chat/api/dtos/dtos';

const getJwtToken = () => {
  let token = localStorage.getItem('token') || '';
  return token.replace(/^"|"$/g, '');
};

const connectionNotification = new signalR.HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_NOTIFICATION_URL || '', {
    accessTokenFactory: () => getJwtToken(),
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const connectNotification = async () => {
  try {
    await connectionNotification.start();
  } catch (err) {
    console.error('SignalR Connection Error: ', err);
  }
};

export const registerNotificationReceived = (callback: (message: string) => void) => {
  connectionNotification.on('ReceiveNotification', callback);
};

export const unregisterNotificationReceived = (callback: (message: string) => void) => {
  connectionNotification.off('ReceiveNotification', callback);
};

export const disconnectNotification = async () => {
  try {
    await connectionNotification.stop();
  } catch (err) {
    console.error('SignalR Disconnect Error: ', err);
  }
};

export default connectionNotification;
