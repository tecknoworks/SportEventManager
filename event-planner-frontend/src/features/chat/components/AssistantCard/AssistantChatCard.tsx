import { HStack, Avatar, VStack, Text } from '@chakra-ui/react';
import { ChatDetails } from 'features/chat/api/dtos/dtos';

type Props = {
  chat: ChatDetails;
  selectedChatDetails?: ChatDetails;
  setSelectedChatDetails: any;
};

const AssistantChatCard = ({ chat, selectedChatDetails, setSelectedChatDetails }: Props) => {
  return (
    <HStack
      key={chat.id}
      w="100%"
      p={5}
      spacing={4}
      _hover={{
        bg: chat.id === selectedChatDetails?.id ? undefined : 'gray.100',
        cursor: 'pointer',
      }}
      bg={chat.id === selectedChatDetails?.id ? 'gray.300' : 'transparent'}
      onClick={() => setSelectedChatDetails(chat)}
      sx={{ bgColor: 'purple.100' }}
    >
      <Avatar name={chat.name} src={chat.imageUrl} />
      <VStack align="start" spacing={1}>
        <Text fontWeight="bold">{chat.name}</Text>
      </VStack>
    </HStack>
  );
};

export default AssistantChatCard;
