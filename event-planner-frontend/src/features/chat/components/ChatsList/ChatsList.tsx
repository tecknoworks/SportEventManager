import { Box, Text, VStack, useColorMode } from '@chakra-ui/react';
import { ChatDetails } from 'features/chat/api/dtos/dtos';
import ChatCard from '../ChatCard/ChatCard';
import AssistantChatCard from '../AssistantCard/AssistantChatCard';

type Props = {
  chats: ChatDetails[];
  setSelectedChatDetails: any;
  selectedChatDetails?: ChatDetails;
};

const assistantChat: ChatDetails = {
  id: 'GPT',
  name: 'Your assistant',
  imageUrl:
    'https://png.pngtree.com/png-vector/20230521/ourmid/pngtree-artificial-intelligence-chat-gpt-chatting-web-speech-vector-png-image_52368004.jpg',
  participantsCount: 0,
};


const ChatsList = ({ chats, setSelectedChatDetails, selectedChatDetails }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <VStack
      width="100%"
      minW="300px"
      maxW="300px"
      height="100%"
      borderColor="gray.200"
      spacing={4}
      gap={0}
      overflowY="auto"
      bgColor={bgColor}
      borderRadius="1rem"
      className="hide-scrollbar"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <AssistantChatCard
        chat={assistantChat}
        setSelectedChatDetails={setSelectedChatDetails}
        selectedChatDetails={selectedChatDetails}
      />

      {chats.map((chat) => (
        <ChatCard
          chat={chat}
          selectedChatDetails={selectedChatDetails}
          setSelectedChatDetails={setSelectedChatDetails}
        />
      ))}

      {chats.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" padding="1rem">
          <Text>Nothing found</Text>
        </Box>
      )}
    </VStack>
  );
};

export default ChatsList;
