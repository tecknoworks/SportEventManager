import { Box, BoxProps, Text, Flex, FormControl, FormLabel, Input, Stack, CloseButton, Select } from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import React from 'react';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const FilterForm = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      display="flex"
      bg={'white'}
      borderRight="1px"
      padding="20px"
      width="250px"
      borderRightColor={'gray.200'}
      {...rest}
    >
      <Flex h="20" alignItems="center">
        <Text color="gray.500" as="b" fontSize="3xl">
          Filters
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <form className="form-container">
        <Stack height="100%" spacing={5}>
          <FormControl>
            <FormLabel>Sport Types</FormLabel>
            <Select placeholder="Select option">
              <option value="option1">Football</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input placeholder="Select Date and Time" size="md" type="datetime-local" />
          </FormControl>
          <FormControl>
            <FormLabel>Maximum Duration</FormLabel>
            <Input type="number" placeholder="Maximum Duration" />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input type="text" placeholder="Location" />
          </FormControl>
          <FormControl>
            <FormLabel>Creator of Events</FormLabel>
            <Input type="text" placeholder="Creator of Events" />
          </FormControl>
          <PrimaryButton type="submit" text="Apply Filters" />
        </Stack>
      </form>
    </Box>
  );
};

export default FilterForm;
