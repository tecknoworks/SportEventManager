import React, { ReactElement, ReactNode, useState } from 'react';
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon, useColorMode } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import PrimaryButton from '../buttons/PrimaryButton';

interface Props {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState<string>('');

  const handleOnClick = () => {
    onSearch(input);
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <>
      <InputGroup width="100%" bg={bgColor} borderRadius={5} size="md">
        <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.600" />} />
        <Input
          type="text"
          value={input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
          placeholder="Search..."
          border="1px solid purple"
        />
        <InputRightAddon bg="purple.500" p={0} border="none">
          <PrimaryButton text={'Search'} onClick={handleOnClick} />
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
