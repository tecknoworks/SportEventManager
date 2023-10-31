import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Input, Select, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserRow from '../User/UserRow';
import PasswordInput from 'common/components/PasswordInput/PasswordInput';
import { isValidEmail } from 'common/validators/emailValidator';
import { validatePassword } from 'common/validators/passwordValidator';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';
import { useDebounce } from 'use-debounce';

const TableManagement: React.FC = () => {
  const initialUsers = [{ id: 1, name: 'ion', email: 'ion@gmail.com', phoneNumber: '0747545789' }];

  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [showFields, setShowFields] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const toast = useToast()
  const [debouncedNewUser] = useDebounce(newUser, 2000);

  const validateFields = () => {
    setEmailError(isValidEmail(newUser.email) ? "" : "Invalid Email");
    setPasswordError(validatePassword(newUser.password));
    setPhoneError(isValidPhoneNumber(newUser.phoneNumber) ? "" : "Invalid Phone Number");
  };

  const isValid = !emailError && !passwordError && !phoneError;

  useEffect(() => {
    validateFields();
    // Trigger toast if there are errors
    if (emailError && touchedFields.email) {
      toast({ description: emailError, status: "error" });
    }
    if (passwordError && touchedFields.password) {
      toast({ description: passwordError, status: "error" });
    }
    if (phoneError && touchedFields.phoneNumber) {
      toast({ description: phoneError, status: "error" });
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
    <Box className="form-wrapper" display="flex" width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
                  <Input placeholder="Name" value={newUser.name} onChange={(e) => { setNewUser({ ...newUser, name: e.target.value }); setTouchedFields({ ...touchedFields, name: true }) }} />
                </Td>
                <Td>
                  <Input placeholder="Email" value={newUser.email} onChange={(e) => {
                    setNewUser({ ...newUser, email: e.target.value });
                    setTouchedFields({ ...touchedFields, email: true });
                  }} />
                </Td>
                <Td>
                  <Input placeholder="Phone" value={newUser.phoneNumber} onChange={(e) => { setNewUser({ ...newUser, phoneNumber: e.target.value }); setTouchedFields({ ...touchedFields, phoneNumber: true }) }} />
                </Td>
              </Tr>
            )}

            {showFields && (
              <Tr>
                <Td>
                  <Select placeholder="Roles:">
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </Select>
                </Td>
                <Td>
                  <PasswordInput
                    value={newUser.password}
                    onChange={(e) => { setNewUser({ ...newUser, password: e.target.value }); setTouchedFields({ ...touchedFields, password: true }) }}
                    show={showPassword}
                    onToggleShow={() => { setShowPassword(!showPassword) }}
                    placeholder="Password"
                    errorMessage={""}
                    isRequired={true}
                  />
                </Td>
                <Td>
                  <Button onClick={() => { setShowFields(!showFields); addUser() }} isDisabled={!isValid}>Confirm</Button>
                </Td>
              </Tr>
            )}
            <Tr>
              <Td colSpan={5}>
                <Button onClick={() => { setShowFields(!showFields) }}>Add User</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableManagement;