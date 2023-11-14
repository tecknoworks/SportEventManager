import React, { useEffect, useRef } from 'react';
import { VStack } from '@chakra-ui/react';
import MessageCard from '../MessageCard/MessageCard';
import { Message } from 'features/chat/api/dtos/dtos';

type Props = {
  messages: Message[];
  currentUser: string;
};

const MessagesList = ({ messages, currentUser }: Props) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
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
        <MessageCard key={index} message={message} isCurrentUser={message.username === currentUser} />
      ))}
      <div ref={endOfMessagesRef} />
    </VStack>
  );
};

export default MessagesList;
