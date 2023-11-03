import "./AdminPage.scss"
import { Box, Text } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';

const AdminPage = () => {
  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <div className='resizable-div'>
        <Text fontSize='5xl'>Admin Page</Text>
        <TableManagement />
      </div>
    </Box>
  );
};

export default AdminPage;
