import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import ChatsList from '../components/ChatsList/ChatsList';
import IndividualChat from '../components/IndividualChat/IndividualChat';
import ChatSearch from '../components/ChatSearch/ChatSearch';
import { ChatDetails } from '../models/chatDetails';

const ChatPage = () => {
  const chats: Array<ChatDetails> = [
    {
      id: '1',
      name: 'Your Assistant',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 9,
    },
    {
      id: '2',
      name: 'Gheorgheni fotbal',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 10,
    },
    {
      id: '3',
      name: 'Your Assistant',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 20,
    },
    {
      id: '4',
      name: 'Gheorgheni fotbal',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 25,
    },
    {
      id: '5',
      name: 'Your Assistant',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 24,
    },
    {
      id: '6',
      name: 'Gheorgheni fotbal',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 30,
    },
    {
      id: '7',
      name: 'Your Assistant',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 22,
    },
    {
      id: '8',
      name: 'Gheorgheni fotbal',
      lastMessage: {
        from: 'marco04',
        content: 'This is the last message',
        timestamp: '12:39',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
      participantsCount: 23,
    },
  ];

  const [selectedChatDetails, setSelectedChatDetails] = useState<ChatDetails>(chats[0]);

  return (
    <Box className="mybox" display="flex" gap="2rem" padding="2rem" height="100%">
      <Box display="flex" flexDirection="column" justifyContent="center" gap="1rem">
        <ChatSearch />
        <ChatsList
          chats={chats}
          selectedChatDetails={selectedChatDetails}
          setSelectedChatDetails={setSelectedChatDetails}
        />
      </Box>
      <IndividualChat chatDetails={selectedChatDetails} />
    </Box>
  );
};

export default ChatPage;
