import { Input } from '@chakra-ui/input';
import { VStack, HStack } from '@chakra-ui/layout';
import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { ArrowRightIcon } from '@chakra-ui/icons';
import MessagesList from '../MessagesList/MessagesList';

const IndividualChat = () => {
  const [newMessage, setNewMessage] = React.useState('');

  const messagesData = [
    {
      sender: 'user123',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius iusto, perspiciatis officiis incidunt saepe ex quia. Possimus fugiat porro, praesentium incidunt qui suscipit quidem. Explicabo culpa velit earum assumenda sed.',
      timestamp: '12:00 PM',
      isCurrentUser: false,
    },
    {
      sender: 'currentUser',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius iusto, perspiciatis officiis incidunt saepe ex quia. Possimus fugiat porro, praesentium incidunt qui suscipit quidem. Explicabo culpa velit earum assumenda sed.',
      timestamp: '12:01 PM',
      isCurrentUser: true,
    },
    {
      sender: 'user123',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius iusto, perspiciatis officiis incidunt saepe ex quia. Possimus fugiat porro, praesentium incidunt qui suscipit quidem. Explicabo culpa velit earum assumenda sed.',
      timestamp: '12:00 PM',
      isCurrentUser: false,
    },
    {
      sender: 'currentUser',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius iusto, perspiciatis officiis incidunt saepe ex quia. Possimus fugiat porro, praesentium incidunt qui suscipit quidem. Explicabo culpa velit earum assumenda sed.',
      timestamp: '12:01 PM',
      isCurrentUser: true,
    },
    {
      sender: 'user123',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius iusto, perspiciatis officiis incidunt saepe ex quia. Possimus fugiat porro, praesentium incidunt qui suscipit quidem. Explicabo culpa velit earum assumenda sed.',
      timestamp: '12:00 PM',
      isCurrentUser: false,
    },
    {
      sender: 'currentUser',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius iusto, perspiciatis officiis incidunt saepe ex quia. Possimus fugiat porro, praesentium incidunt qui suscipit quidem. Explicabo culpa velit earum assumenda sed.',
      timestamp: '12:01 PM',
      isCurrentUser: true,
    },
  ];

  const handleSendMessage = () => {};

  return (
    <VStack borderRadius="2rem" align="stretch" flex="1" height="100%" bgColor="whiteAlpha.800">
      <ChatHeader
        title="Chat Title"
        avatarUrl={'https://cdn-icons-png.flaticon.com/512/11865/11865338.png'}
        participantsCount={20}
      />

      <VStack
        flex="1"
        overflowY="auto"
        w="100%"
        p={4}
        spacing={4}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <MessagesList messages={messagesData} currentUser="currentUser" />
      </VStack>
      <HStack p={4} w="100%" bgColor="white" height="5rem" borderBottomRadius="2rem">
        <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <PrimaryButton text={<ArrowRightIcon />} onClick={handleSendMessage} />
      </HStack>
    </VStack>
  );
};

export default IndividualChat;
