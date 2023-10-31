import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserRow from '../User/UserRow';
import { useDebounce } from 'use-debounce';
import CreateUserModal from '../Moldal/CreateUserModal';

const TableManagement: React.FC = () => {
  const initialUsers = [{ id: 1, name: 'ion', email: 'ion@gmail.com', phoneNumber: '0747545789' }];

  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

 
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const toast = useToast();
  const [debouncedNewUser] = useDebounce(newUser, 2000);
  const { isOpen, onOpen, onClose } = useDisclosure();



  const isValid = !emailError && !passwordError && !phoneError;

  useEffect(() => {
    
    // Trigger toast if there are errors
    if (emailError && touchedFields.email) {
      toast({ description: emailError, status: 'error' });
    }
    if (passwordError && touchedFields.password) {
      toast({ description: passwordError, status: 'error' });
    }
    if (phoneError && touchedFields.phoneNumber) {
      toast({ description: phoneError, status: 'error' });
    }
  }, [debouncedNewUser, toast]);

  const addUser = () => {
    let isValid = true;
    if (isValid) {
      const newUserData = { id: users.length + 1, ...newUser };
      setUsers([...users, newUserData]);
    }
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
    <TableContainer pt={9} width="100%">
      {users.length > 0 ? (
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

            <CreateUserModal
              isOpen={isOpen}
              onClose={onClose}
              addUser={addUser}
              isValid={isValid}
              newUser={newUser}
              setNewUser={setNewUser}
            />
            <Button mt="6" onClick={onOpen}>Add User</Button>
          </Tbody>
        </Table>
      ) : (
        <Text fontSize="2xl">We have 0 users</Text>
      )}
    </TableContainer>
  );
};

export default TableManagement;
