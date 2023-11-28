import { Avatar } from '@chakra-ui/avatar';
import { HStack, VStack, Text } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';

type Props = {
  title: string;
  avatarUrl: string;
  participantsCount?: number;
};

const ChatHeader = ({ title, avatarUrl, participantsCount }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <HStack spacing={2} p={4} height="5rem" bg={bgColor} w="100%" borderTopRadius="1rem">
      <Avatar name={title} src={avatarUrl} />
      <VStack align="start">
        <Text fontSize="xl">{title}</Text>
        {participantsCount && <Text fontSize="sm">{participantsCount} participants</Text>}
      </VStack>
    </HStack>
  );
};

export default ChatHeader;
