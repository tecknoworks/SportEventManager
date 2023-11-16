import React from 'react';
import { Text, Box, useColorModeValue } from '@chakra-ui/react';
import { Message } from 'features/chat/api/dtos/dtos';
import { messageDateFormatter } from 'features/chat/helpers/messageDateFormatter';
import { Link } from 'react-router-dom';

type Props = {
  message: Message;
  isCurrentUser: boolean;
};

const MessageCard = ({ message, isCurrentUser }: Props) => {
  const bgColor = 'gray.100';
  const bgGradient = useColorModeValue('linear(to-r, pink.400, purple.600)', 'linear(to-r, pink.600, purple.800)');
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
    >
      <Text fontSize="sm" color={isCurrentUser ? 'white' : 'gray.500'}>
        <Link to={'/profile/' + message.userId}>
          <b>{message.username}</b>
        </Link>
      </Text>
      <Text color={isCurrentUser ? 'white' : textColor}>{message.messageText}</Text>
      <Text fontSize="xs" alignSelf="flex-end" color={isCurrentUser ? 'blue.200' : 'gray.400'}>
        {messageDateFormatter(message.date)}
      </Text>
    </Box>
  );
};

export default MessageCard;
