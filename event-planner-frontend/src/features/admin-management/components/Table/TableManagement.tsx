import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import UserRow from '../User/UserRow';

const TableManagement = () => {
  const initialUsers = [{ id: 1, name: 'ion', email: 'ion@gmail.com', phoneNumber: '0747545789' }];

  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [showFields, setShowFields] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const addUser = () => {
    const newUser = { id: users.length + 1, name: newUserName, email: newUserEmail, phoneNumber: newPhoneNumber };
    setUsers([...users, newUser]);
  };

  // const editUser = (id: number, updatedUser: any) => {
  //     setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  //     setEditingUser(null);
  // };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const sendRecoveryEmail = (email: string) => {
    console.log(`Sending recovery email to ${email}`);
  };

  return (
    <Box className="form-wrapper" display="flex" width="80%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Text fontSize="5xl">Admin Page</Text>
      <TableContainer pt={9} width="100%">
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
            {users.map((user) => (
              <UserRow key={user.id} user={user} deleteUser={deleteUser} sendRecoveryEmail={sendRecoveryEmail} />
            ))}
            {showFields && (
              <Tr>
                <Td>
                  <Input placeholder="Name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                </Td>
                <Td>
                  <Input placeholder="Email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
                </Td>
                <Td>
                  <Input
                    placeholder="Phone"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                  />
                </Td>
                <Td>
                  <Select placeholder="Roles:">
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </Select>
                </Td>
                <Td>
                  <Button onClick={addUser}>Confirm</Button>
                </Td>
              </Tr>
            )}
            <Tr>
              <Td colSpan={5}>
                <Button onClick={()=>{setShowFields(!showFields)}}>Add User</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableManagement;
