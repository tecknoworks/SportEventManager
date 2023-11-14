import { Input } from '@chakra-ui/input';
import { VStack, HStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { ArrowRightIcon } from '@chakra-ui/icons';
import MessagesList from '../MessagesList/MessagesList';
import { ChatDetails, Message } from 'features/chat/api/dtos/dtos';
import { AppDispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsMessagesThunk } from 'features/chat/store/thunks/getChatMessagesThunk';
import { selectChatMessages } from 'features/chat/store/selectors/chatSelector';
import { registerMessageReceived, sendMessage } from 'services/signalService';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { UserDetails, getUserFromToken } from 'services/auth/context/AuthContext';
import { AddMessagePaylod, addMessage } from 'features/chat/store/slices/chatSlice';

type Props = {
  chatDetails?: ChatDetails;
};

const IndividualChat = ({ chatDetails }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const messagesSelector = useSelector((state: RootState) => selectChatMessages(state, chatDetails?.id || ''));
  const [newMessage, setNewMessage] = useState('');
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState<UserDetails>();

  useEffect(() => {
    if (token) {
      setUserDetails(getUserFromToken(token));
    }
  }, []);

  useEffect(() => {
    if (chatDetails) {
      dispatch(getChatsMessagesThunk(chatDetails.id));
    }
  }, [dispatch, chatDetails]);

  useEffect(() => {
    const messageReceived = (message: Message) => {
      const payload: AddMessagePaylod = {
        chatId: chatDetails?.id || '',
        message: message,
      };
      dispatch(addMessage(payload));
    };

    registerMessageReceived(messageReceived);
  }, [dispatch]);

  const handleSendMessage = () => {
    if (!chatDetails) return;
    sendMessage(newMessage, chatDetails.id);
    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return chatDetails && messagesSelector ? (
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
        <MessagesList messages={messagesSelector} currentUser={userDetails?.username || ''} />
      </VStack>
      <HStack p={4} w="100%" bgColor="white" height="5rem" borderBottomRadius="1rem">
        <Input
          placeholder="Type a message..."
          onKeyDown={handleKeyPress}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <PrimaryButton text={<ArrowRightIcon />} onClick={handleSendMessage} />
      </HStack>
    </VStack>
  ) : (
    <></>
  );
};

export default IndividualChat;
