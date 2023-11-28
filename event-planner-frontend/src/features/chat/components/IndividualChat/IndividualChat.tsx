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
import { selectChatHasMore, selectChatMessages } from 'features/chat/store/selectors/chatSelector';
import { registerMessageReceived, sendMessage, unregisterMessageReceived } from 'services/signalService';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { UserDetails, getUserFromToken } from 'services/auth/context/AuthContext';
import { AddMessagePaylod, addMessage } from 'features/chat/store/slices/chatSlice';
import { useColorMode } from '@chakra-ui/react';

type Props = {
  chatDetails?: ChatDetails;
};

const IndividualChat = ({ chatDetails }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const messagesSelector = useSelector((state: RootState) => selectChatMessages(state, chatDetails?.id || ''));
  const [newMessage, setNewMessage] = useState('');
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState<UserDetails>();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState(100);
  const hasMore = useSelector((state: RootState) => selectChatHasMore(state, chatDetails?.id || ''));

  useEffect(() => {
    if (token) {
      setUserDetails(getUserFromToken(token));
    }
  }, []);

  useEffect(() => {
    if (chatDetails) {
      const areMessagesCached = messagesSelector && messagesSelector.length > 0;

      if (!areMessagesCached) {
        dispatch(getChatsMessagesThunk({ chatId: chatDetails.id, pageNumber, pageSize }));
      }
    }
  }, [chatDetails]);

  useEffect(() => {
    const messageReceived = (message: Message) => {
      if (chatDetails && message.chatId === chatDetails.id) {
        const payload: AddMessagePaylod = {
          chatId: chatDetails?.id || '',
          message: message,
        };
        dispatch(addMessage(payload));
      }
    };
    registerMessageReceived(messageReceived);

    return () => {
      unregisterMessageReceived(messageReceived);
    };
  }, [dispatch, chatDetails]);

  const fetchMoreMessages = async () => {
    if (chatDetails && hasMore) {
      const nextPage = pageNumber + 1;
      dispatch(getChatsMessagesThunk({ chatId: chatDetails.id, pageNumber: nextPage, pageSize }));
      setPageNumber(nextPage);
    }
  };

  const handleSendMessage = () => {
    if (!chatDetails || newMessage.length === 0) return;
    sendMessage(newMessage, chatDetails.id);
    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';
  const bgColorChat = colorMode === 'dark' ? 'whiteAlpha.400' : 'whiteAlpha.700';

  return chatDetails && messagesSelector ? (
    <VStack borderRadius="2rem" align="stretch" flex="1" height="100%" bgColor={bgColorChat} >
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
        <MessagesList
          hasMore={hasMore}
          loadMoreMessages={fetchMoreMessages}
          messages={messagesSelector}
          currentUser={userDetails?.username || ''}
        />
      </VStack>
      <HStack p={4} w="100%" bgColor={bgColor} height="5rem" borderBottomRadius="1rem">
        <Input
          placeholder="Type a message..."
          onKeyDown={handleKeyPress}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          bg={bgColor}
        />
        <PrimaryButton text={<ArrowRightIcon />} onClick={handleSendMessage} />
      </HStack>
    </VStack>
  ) : (
    <></>
  );
};

export default IndividualChat;
