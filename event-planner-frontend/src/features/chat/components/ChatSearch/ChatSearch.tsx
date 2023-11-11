import { Search2Icon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import React, { useState } from 'react';

const ChatSearch = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Box display="flex" gap="0.5rem" padding="0.5rem">
      <Input
        bgColor="white"
        placeholder="Search chats..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        borderRadius="2rem"
      />
      <PrimaryButton text={<Search2Icon />} />
    </Box>
  );
};

export default ChatSearch;
