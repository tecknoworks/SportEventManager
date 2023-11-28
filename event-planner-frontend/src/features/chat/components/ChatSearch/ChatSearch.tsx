import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';
import { ChatDetails } from 'features/chat/api/dtos/dtos';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = {
  allChats: ChatDetails[];
  setFoundChats: (chats: ChatDetails[]) => void;
};

const ChatSearch = ({ setFoundChats, allChats }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      const foundChats = allChats.filter((chat) =>
        chat.name.toLocaleLowerCase().includes(debouncedSearchValue.toLowerCase())
      );
      setFoundChats(foundChats);
    } else {
      setFoundChats(allChats);
    }
  }, [debouncedSearchValue, allChats, setFoundChats]);

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box display="flex" gap="0.5rem" padding="0.5rem">
      <Input
        bgColor={bgColor}
        placeholder="Search chats..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        borderRadius="2rem"
      />
    </Box>
  );
};

export default ChatSearch;
