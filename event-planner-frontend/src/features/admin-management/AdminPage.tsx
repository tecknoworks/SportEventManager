import "./AdminPage.scss"
import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';

const AdminPage = () => {
  const [isSmallHeight] = useMediaQuery('(max-width: 1300px)');

  return (
    <Box className="form-page-wrapper" display="flex" justifyContent="center" alignItems="center" width="100%" height="100hv" paddingTop={isSmallHeight ? '33%' : '25%'}>
      <div className='resizable-div'>
        <Text fontSize='5xl'>Admin Page</Text>
        <TableManagement />
      </div>
    </Box>
  );
};

export default AdminPage;