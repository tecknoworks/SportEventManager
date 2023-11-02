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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserRow from '../User/UserRow';
import CreateUserModal from '../Moldal/CreateUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { getAllUsersThunk } from 'features/admin-management/store/thunks/getAllUsersThunk';
import { selectAllUsers } from 'features/admin-management/store/selectors/adminSelectors';
import { deleteUserThunk } from 'features/admin-management/store/thunks/deleteUserThunk';
import { sendRecoverPasswordEmailThunk } from 'features/admin-management/store/thunks/sendRecoverPasswordEmailthunk';

type User = {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
};

const TableManagement: React.FC = () => {
  const toast = useToast()

  const [users, setUsers] = useState<User[]>([]);
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


  useEffect(() => {
    dispatch(getAllUsersThunk())
    setUsers(allUsers)

  }, [])

  useEffect(() => {
    setUsers(allUsers)
  }, [allUsers])




  const deleteUser = (userId: any) => {
    dispatch(deleteUserThunk(userId));
    const updatedUsers = users.filter(user => user.userId !== userId);
    setUsers(updatedUsers);
    toast({
      title: 'User deleted successfully.',
      status: 'success',
    })
  }

  const sendRecoveryEmail = (email: string) => {
    dispatch(sendRecoverPasswordEmailThunk({ email }))
    toast({
      title: "If there's an account associated with this email address, we've sent instructions for resetting the password.",
      status: 'success',
    })
  };

  return (
    <>
      <TableContainer pt={9} width="100%">
        {users.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>UserName</Th>
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
