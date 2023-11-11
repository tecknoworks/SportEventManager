import React from 'react';
import { Text, VStack, HStack, Avatar } from '@chakra-ui/react';
import { ChatDetails } from 'features/chat/api/dtos/dtos';
import { Message } from 'features/chat/api/dtos/dtos';

type Props = {
  chats: ChatDetails[];
  lastMessage: Message;
  setSelectedChatDetails: any;
  selectedChatDetails?: ChatDetails;
};

const ChatsList = ({ chats, setSelectedChatDetails, selectedChatDetails, lastMessage }: Props) => {
  return (
    <VStack
      width="100%"
      maxW="400px"
      height="100%"
      borderColor="gray.200"
      spacing={4}
      gap={0}
      overflowY="auto"
      bgColor="white"
      borderRadius="1rem"
      className="hide-scrollbar"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {chats.map((chat) => (
        <HStack
          key={chat.id}
          w="100%"
          p={5}
          spacing={4}
          _hover={{
            bg: chat.id === selectedChatDetails?.id ? undefined : 'gray.100',
            cursor: 'pointer',
          }}
          bg={chat.id === selectedChatDetails?.id ? 'gray.300' : 'transparent'}
          onClick={() => setSelectedChatDetails(chat)}
        >
          <Avatar name={chat.name} src={chat.imageUrl} />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{chat.name}</Text>
            <Text fontSize="sm" color="gray.500">
              <b>{lastMessage.username}:</b> {lastMessage.messageText}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default ChatsList;
