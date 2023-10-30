import React from 'react'
import { Box } from '@chakra-ui/react';
import TableManagement from './components/Table/TableManagement';

const AdminPage = () => {
    return (
        <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
            <TableManagement />
        </Box>
    )
}

export default AdminPage