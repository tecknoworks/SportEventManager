import React from 'react';
import { Text, Box, useColorModeValue } from '@chakra-ui/react';

type Props = {
  key: number;
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
};

const MessageCard = ({ key, sender, message, timestamp, isCurrentUser }: Props) => {
  const bgColor = 'gray.100';
  const bgGradient = useColorModeValue(
    'linear(to-r, pink.400, purple.600)', //
    'linear(to-r, pink.600, purple.800)' // Dark mode gradient
  );
  const alignSelf = isCurrentUser ? 'flex-end' : 'flex-start';
  const textColor = 'gray.800';

  return (
    <Box
      alignSelf={alignSelf}
      maxW="80%"
      bg={isCurrentUser ? 'transparent' : bgColor}
      bgGradient={isCurrentUser ? bgGradient : 'none'}
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
