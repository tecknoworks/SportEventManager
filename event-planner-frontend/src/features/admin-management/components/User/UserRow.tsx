import { Tr, Td, Button, Tooltip } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, EmailIcon } from '@chakra-ui/icons';
import React from 'react';

type User = {
    userId: number;
    userName: string;
    email: string;
    phoneNumber: string;
}
interface UserRowProps {
    user: User;
    deleteUser: (userId: number) => void;
    sendRecoveryEmail: (email: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, deleteUser, sendRecoveryEmail }) => {
    return (
        <Tr>
            <Td>{user.userName}</Td>
            <Td>{user.email}</Td>
            <Td>{user.phoneNumber}</Td>
            <Td display='flex' justifyContent='flex-end'>
                <Tooltip label='Edit user'>
                    <Button mr='3' bg={'blue.300'}><EditIcon /></Button>
                </Tooltip>
                <Tooltip label='Send Recovery Email'>
                    <Button mr='3' bg={'green.300'} onClick={() => sendRecoveryEmail(user.email)}><EmailIcon /></Button>
                </Tooltip>
                <Tooltip label='Delete user'>
                    <Button bg={'red.300'} onClick={() => deleteUser(user.userId)}><DeleteIcon /></Button>
                </Tooltip>

            </Td>
        </Tr>
    );
};

export default UserRow;
