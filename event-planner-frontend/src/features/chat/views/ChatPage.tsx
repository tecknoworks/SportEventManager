import { Box } from '@chakra-ui/layout';
import React from 'react';
import ChatsList from '../components/ChatsList/ChatsList';
import IndividualChat from '../components/IndividualChat/IndividualChat';
import ChatSearch from '../components/ChatSearch/ChatSearch';

const ChatPage = () => {
  return (
    <Box className="mybox" display="flex" gap="2rem" padding="2rem" height="100%">
      <Box display="flex" flexDirection="column" justifyContent="center" gap="1rem">
        <ChatSearch />
        <ChatsList />
      </Box>
      <IndividualChat />
    </Box>
  );
};

export default ChatPage;
