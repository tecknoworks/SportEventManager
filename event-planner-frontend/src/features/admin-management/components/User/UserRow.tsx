import { Tr, Td, Button } from '@chakra-ui/react';
import React from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}
interface UserRowProps {
    user: User;
    deleteUser: (id: number) => void;
    sendRecoveryEmail: (email: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, deleteUser, sendRecoveryEmail }) => {
    return (
        <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.phoneNumber}</Td>
            <Td>
                <Button mr='3' bg={'blue.300'}>Edit</Button>
                <Button mr='3' bg={'green.300'} onClick={() => sendRecoveryEmail(user.email)}>Send Recovery Email</Button>
                <Button bg={'red.300'} onClick={() => deleteUser(user.id)}>Delete</Button>

            </Td>
        </Tr>
    );
};

export default UserRow;
