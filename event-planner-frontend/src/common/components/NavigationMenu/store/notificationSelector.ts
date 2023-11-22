import { RootState } from 'redux/store';

export const selectNotificationMessages = (state: RootState) => state.notification.messages;
