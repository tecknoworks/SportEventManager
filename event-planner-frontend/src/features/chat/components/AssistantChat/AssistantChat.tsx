import { ArrowRightIcon } from '@chakra-ui/icons';
import { VStack, HStack, Input, useColorMode } from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { ChatDetails, CreateMessage, OpenAIMessage } from 'features/chat/api/dtos/dtos';
import { useEffect, useRef, useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getThreadMessagesThunk } from 'features/chat/store/thunks/getThreadMessagesThunk';
import { selectChatsAssistantMessages, selectChatsDetailsIsLoading } from 'features/chat/store/selectors/chatSelector';
import OpenAiMessageCard from '../OpenAiMessageCard/OpenAiMessageCard';
import { createAssistantMessageThunk } from 'features/chat/store/thunks/createMessageThunk';
import { Spinner } from '@chakra-ui/react';
import { AddAssistantChatMessagePaylod, addAssistantChatMessage } from 'features/chat/store/slices/chatSlice';
import { createDefaultOpenAIMessage } from 'features/chat/helpers/dtoInstances';

type Props = {
  chatDetails: ChatDetails;
};

const AssistantChat = ({ chatDetails }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const messages = useSelector(selectChatsAssistantMessages);
  const isAssistantLoading = useSelector(selectChatsDetailsIsLoading);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createOpenAiMessage = () => {
    const message = createDefaultOpenAIMessage();
    message.content[0].text.value = newMessage;
    message.role = 'user';
    return message;
  };

  const handleSendMessage = () => {
    if (newMessage.length === 0) return;
    const messageDto: CreateMessage = {
      threadId: localStorage.getItem('threadId') || '',
      assistantId: localStorage.getItem('assistantId') || '',
      userQuestion: newMessage,
    };

    dispatch(createAssistantMessageThunk(messageDto));
    const payload: AddAssistantChatMessagePaylod = {
      message: createOpenAiMessage(),
    };
    dispatch(addAssistantChatMessage(payload));
    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    dispatch(getThreadMessagesThunk(localStorage.getItem('threadId') || ''));
  }, []);

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';
  const bgColorChat = colorMode === 'dark' ? 'whiteAlpha.400' : 'whiteAlpha.700';

  return chatDetails ? (
    <VStack borderRadius="2rem" align="stretch" flex="1" height="100%" bg={bgColorChat}>
      <ChatHeader title={chatDetails.name} avatarUrl={chatDetails.imageUrl} />
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
        {messages.map((message) => (
          <OpenAiMessageCard message={message} isCurrentUser={message.role === 'user'} />
        ))}
        {isAssistantLoading && <Spinner speed="0.65s" />}
        <div ref={endOfMessagesRef} />
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

export default AssistantChat;
