import './AdminPage.scss';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';

const AdminPage = () => {
  return (
    <Box display="flex" h="100%" justifyContent="center" width="100%" alignItems="center">
      <div className="resizable-div">
        <Text fontSize="5xl">Admin Page</Text>
        <TableManagement />
      </div>
    </Box>
  );
};

export default AdminPage;
