import React from 'react';
import { Box, Image, Text, VStack, HStack, Avatar } from '@chakra-ui/react';

const ChatsList = () => {
  // This is hardcoded data for demonstration purposes
  const chats = [
    {
      id: 1,
      name: 'Your Assistant',
      lastMessage: {
        message: 'This is the last message',
        from: 'marco04',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
    },
    {
      id: 2,
      name: 'Gheorgheni fotbal',
      lastMessage: {
        message: 'This is the last message',
        from: 'marco04',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
    },
    {
      id: 3,
      name: 'Manastur Volei',
      lastMessage: {
        message: 'This is the last message',
        from: 'marco04',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
    },
    {
      id: 4,
      name: 'Chat 2',
      lastMessage: {
        message: 'This is the last message',
        from: 'marco04',
      },
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/11865/11865338.png',
    },
  ];

  return (
    <VStack width="100%" maxW="400px" height="100%" borderColor="gray.200" spacing={4} overflowY="auto">
      {chats.map((chat) => (
        <HStack key={chat.id} w="100%" p={3} spacing={4} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
          <Avatar name={chat.name} src={chat.imageUrl} />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{chat.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {chat.lastMessage.from}:{chat.lastMessage.message}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default ChatsList;
