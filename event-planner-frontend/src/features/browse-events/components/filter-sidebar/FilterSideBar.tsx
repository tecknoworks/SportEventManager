import { Box, useDisclosure, Drawer, DrawerContent } from '@chakra-ui/react';
import FilterForm from './FilterForm';

export default function FilterSideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={'white'}>
      <FilterForm onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
    </Box>
  );
}
