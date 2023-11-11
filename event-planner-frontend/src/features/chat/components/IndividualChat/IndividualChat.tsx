import { Input } from '@chakra-ui/input';
import { VStack, HStack } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { ArrowRightIcon } from '@chakra-ui/icons';
import MessagesList from '../MessagesList/MessagesList';
import { ChatDetails } from 'features/chat/api/dtos/dtos';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsMessagesThunk } from 'features/chat/store/thunks/getChatMessagesThunk';
import { selectChatMessages } from 'features/chat/store/selectors/chatSelector';
import { sendMessage } from 'services/signalService';

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

type Props = {
  chatDetails?: ChatDetails;
};

const IndividualChat = ({ chatDetails }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const chatMessages = useSelector(selectChatMessages);
  const [newMessage, setNewMessage] = React.useState('');

  useEffect(() => {
    if (chatDetails) {
      dispatch(getChatsMessagesThunk(chatDetails.id));
    }
  }, [chatDetails]);

  const handleSendMessage = () => {
    if (!chatDetails) return;
    sendMessage(newMessage, chatDetails.id);
    setNewMessage('');
  };

  return chatDetails ? (
    <VStack borderRadius="2rem" align="stretch" flex="1" height="100%" bgColor="whiteAlpha.800">
      <ChatHeader
        title={chatDetails.name}
        avatarUrl={chatDetails.imageUrl}
        participantsCount={chatDetails.participantsCount}
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
        <MessagesList messages={chatMessages} currentUser="currentUser" />
      </VStack>
      <HStack p={4} w="100%" bgColor="white" height="5rem" borderBottomRadius="1rem">
        <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <PrimaryButton text={<ArrowRightIcon />} onClick={handleSendMessage} />
      </HStack>
    </VStack>
  ) : (
    <></>
  );
};

export default IndividualChat;
