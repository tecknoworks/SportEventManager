import './AdminPage.scss';
import { Box, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';
import { useEffect } from 'react';

const AdminPage = () => {
  const { colorMode } = useColorMode();
  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', colorMode === 'dark' ? '#2d3748' : '#fff');
  }, [colorMode]);

  return (
    <Box display="flex" h="100%" justifyContent="center" width="100%" alignItems="center"  >
      <div className="resizable-div">
        <Text fontSize="5xl">Admin Page</Text>
        <TableManagement />
      </div>
    </Box>
  );
};

export default AdminPage;
