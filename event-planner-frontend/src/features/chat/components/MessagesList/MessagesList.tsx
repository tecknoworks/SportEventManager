import { useEffect, useRef, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import MessageCard from '../MessageCard/MessageCard';
import { Message } from 'features/chat/api/dtos/dtos';
import PrimaryButton from 'common/components/buttons/PrimaryButton';

type Props = {
  messages: Message[];
  currentUser: string;
  loadMoreMessages: () => Promise<any>;
  hasMore: boolean;
};

const MessagesList = ({ messages, currentUser, loadMoreMessages, hasMore }: Props) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const messagesListRef = useRef<HTMLDivElement>(null);
  const [prevMessageCount, setPrevMessageCount] = useState(messages.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (messages.length > prevMessageCount && messagesListRef.current) {
      const messageElements = Array.from(messagesListRef.current.children);
      let newMessagesHeight = 0;

      const newMessageElements = messageElements.slice(0, messages.length - prevMessageCount);

      newMessageElements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const marginTop = parseInt(style.marginTop, 10);
        const marginBottom = parseInt(style.marginBottom, 10);
        const elementTotalHeight = element.clientHeight + marginTop + marginBottom + 20;
        newMessagesHeight += elementTotalHeight;
      });

      messagesListRef.current.scrollTop += newMessagesHeight;

      setPrevMessageCount(messages.length);
      setIsLoading(false);
    }
  }, [messages]);

  const handleLoadMore = async () => {
    if (hasMore) {
      setIsLoading(true);
      await loadMoreMessages();
      setIsLoading(false);
    }
  };

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
      ref={messagesListRef}
    >
      {hasMore && <PrimaryButton text="Load more" onClick={handleLoadMore} />}
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} isCurrentUser={message.username === currentUser} />
      ))}

      <div ref={endOfMessagesRef} />
    </VStack>
  );
};

export default MessagesList;
