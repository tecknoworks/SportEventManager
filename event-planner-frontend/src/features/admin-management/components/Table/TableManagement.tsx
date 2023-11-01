import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserRow from '../User/UserRow';
import CreateUserModal from '../Moldal/CreateUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { getAllUsersThunk } from 'features/admin-management/store/thunks/getAllUsersThunk';
import { selectAllUsers } from 'features/admin-management/store/selectors/adminSelectors';

const TableManagement: React.FC = () => {
  const initialUsers = [{ id: 1, name: 'ion', email: 'ion@gmail.com', phoneNumber: '0747545789' }];

  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const addUser = () => {
  //   const newUserData = { id: users.length + 1, ...newUser };
  //   setUsers([...users, newUserData]);

  // };
  const dispatch: AppDispatch = useDispatch();


  const allUsers = useSelector(selectAllUsers)
  console.log(allUsers);



  useEffect(() => {
    dispatch(getAllUsersThunk())
    setUsers(allUsers)

  }, [])

  useEffect(() => {
    setUsers(allUsers)
  }, [allUsers])



  // const editUser = (id: number, updatedUser: any) => {
  //     setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  //     setEditingUser(null);
  // };

  const deleteUser = (id: number) => {
    // setUsers(users.filter((user) => user.id !== id));
  };

  const sendRecoveryEmail = (email: string) => {
    console.log(`Sending recovery email to ${email}`);
  };

  return (
    <>
      <TableContainer pt={9} width="100%">
        {users.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th display='flex' justifyContent='flex-end'>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index: number) => (
                <UserRow key={index} user={user} deleteUser={deleteUser} sendRecoveryEmail={sendRecoveryEmail} />
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text fontSize="2xl">We have 0 users</Text>
        )}
      </TableContainer>
      <Button mt="6" onClick={onOpen}>Add User</Button>
      <CreateUserModal
        isOpen={isOpen}
        onClose={onClose}
        // addUser={addUser}
        newUser={newUser}
        setNewUser={setNewUser}
      />
    </>


  );
};

export default TableManagement;
