import React, { ReactElement, ReactNode } from 'react';
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import PrimaryButton from '../buttons/PrimaryButton';

export const SearchBar = () => {
  return (
    <>
      <InputGroup width="100%" bg="white" borderRadius={5} size="md">
        <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.600" />} />
        <Input type="text" placeholder="Search..." border="1px solid purple" />
        <InputRightAddon bg="purple.500" p={0} border="none">
          <PrimaryButton text={'Search'} />
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
