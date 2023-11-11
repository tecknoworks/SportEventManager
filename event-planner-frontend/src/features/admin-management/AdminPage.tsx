import './AdminPage.scss';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';

const AdminPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
      <div className="resizable-div">
        <Text fontSize="5xl">Admin Page</Text>
        <TableManagement />
      </div>
    </Box>
  );
};

export default AdminPage;
