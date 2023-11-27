import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  messages: string[];
}

const initialState: NotificationState = {
  messages: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotificationMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    clearNotificationMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addNotificationMessage, clearNotificationMessages } = notificationSlice.actions;

export default notificationSlice.reducer;
