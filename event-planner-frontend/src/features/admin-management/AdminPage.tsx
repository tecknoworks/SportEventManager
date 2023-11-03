import React from 'react';
import { Box } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';

const AdminPage = () => {
  return (
    <Box className="form-page-wrapper">
      <TableManagement />
    </Box>
  );
};

export default AdminPage;
