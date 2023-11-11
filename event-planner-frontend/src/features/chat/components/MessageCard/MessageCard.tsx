import React from 'react';
import { Text, Box } from '@chakra-ui/react';

type Props = {
  key: number;
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
};

const MessageCard = ({ key, sender, message, timestamp, isCurrentUser }: Props) => {
  const bgColor = 'gray.100';
  const alignSelf = isCurrentUser ? 'flex-end' : 'flex-start';
  const textColor = 'gray.800';

  return (
    <Box
      alignSelf={alignSelf}
      maxW="80%"
      bg={isCurrentUser ? '#915d91' : bgColor}
      borderRadius="lg"
      padding="3"
      marginY="2"
      key={key}
    >
      <Text fontSize="sm" color={isCurrentUser ? 'white' : 'gray.500'}>
        <b>{sender}</b>
      </Text>
      <Text color={isCurrentUser ? 'white' : textColor}>{message}</Text>
      <Text fontSize="xs" alignSelf="flex-end" color={isCurrentUser ? 'blue.200' : 'gray.400'}>
        {timestamp}
      </Text>
    </Box>
  );
};

export default MessageCard;
