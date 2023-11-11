import { Box } from '@chakra-ui/layout';
import React from 'react';
import ChatsList from '../components/ChatsList/ChatsList';
import Chat from '../components/Chat/Chat';

const ChatPage = () => {
  return (
    <Box display="flex">
      <ChatsList />
      <Chat />
    </Box>
  );
};

export default ChatPage;
