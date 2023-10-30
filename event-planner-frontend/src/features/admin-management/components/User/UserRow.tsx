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
                <Button>Edit</Button>
                <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                <Button onClick={() => sendRecoveryEmail(user.email)}>Send Recovery Email</Button>
            </Td>
        </Tr>
    );
};

export default UserRow;
