import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Text,
    Button,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react';
import UserRow from '../User/UserRow';


const TableManagement = () => {

    const initialUsers = [
        { id: 1, name: 'ion', email: 'ion@gmail.com', phoneNumber: "0747545789" },
    ];


    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);

    // const addUser = (name: string, email: string) => {
    //     const newUser = { id: users.length + 1, name, email };
    //     setUsers([...users, newUser]);
    // };

    // const editUser = (id: number, updatedUser: any) => {
    //     setUsers(users.map(user => (user.id === id ? updatedUser : user)));
    //     setEditingUser(null);
    // };

    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const sendRecoveryEmail = (email: string) => {
        console.log(`Sending recovery email to ${email}`);
    };



    return (
        <Box className="form-wrapper" display="flex" width="900px" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Text fontSize='5xl'>Admin Page</Text>
            <TableContainer pt={9}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone Number</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map(user => (
                            <UserRow key={user.id} user={user} deleteUser={deleteUser} sendRecoveryEmail={sendRecoveryEmail} />
                        ))}
                        <Tr>
                            <Td>
                                {/* <Input placeholder="Name" onBlur={e => addUser(e.target.value, 'new@example.com')} /> */}
                            </Td>
                            <Td>
                                <Input placeholder="Email" />
                            </Td>
                            <Td>
                                <Button>Add User</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </ Box >
    )
}

export default TableManagement