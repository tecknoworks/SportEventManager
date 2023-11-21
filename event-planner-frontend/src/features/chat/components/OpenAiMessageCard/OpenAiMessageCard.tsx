import React from 'react';
import { Text, Box, useColorModeValue } from '@chakra-ui/react';
import { OpenAIMessage } from 'features/chat/api/dtos/dtos';

type Props = {
  message: OpenAIMessage;
  isCurrentUser: boolean;
};

const OpenAiMessageCard = ({ message, isCurrentUser }: Props) => {
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
        <b>{isCurrentUser ? 'You' : 'Assistant'}</b>
      </Text>
      <Text color={isCurrentUser ? 'white' : textColor}>{message.content[0].text.value}</Text>
    </Box>
  );
};

export default OpenAiMessageCard;
