import React from 'react';
import { VStack } from '@chakra-ui/react';
import MessageCard from '../MessageCard/MessageCard';

type Props = {
  messages: Array<any>;
  currentUser: string;
};

const MessagesList = ({ messages, currentUser }: Props) => {
  return (
    <VStack
      spacing={4}
      align="stretch"
      w="full"
      p={4}
      overflowY="auto"
      display="flex"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {messages.map((message, index) => (
        <MessageCard
          key={index}
          sender={message.sender}
          message={message.content}
          timestamp={message.timestamp}
          isCurrentUser={message.sender === currentUser}
        />
      ))}
    </VStack>
  );
};

export default MessagesList;
