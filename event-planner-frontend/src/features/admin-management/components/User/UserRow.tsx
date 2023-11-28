import { Tr, Td, Button, Tooltip, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';

import { CheckIcon, DeleteIcon, EditIcon, EmailIcon, NotAllowedIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { isValidEmail } from 'common/validators/emailValidator';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';
import ConfirmationModal from '../Moldal/ConfirmationModal';
import { useSelector } from 'react-redux';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { getUserFromToken } from 'services/auth/context/AuthContext';

type User = {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  isBlocked: boolean;
};

interface UserRowProps {
  user: User;
  deleteUser: (userId: number) => void;
  sendRecoveryEmail: (email: string) => void;
  editUserOrAdmin: (editedUser: Account, userId: number) => void;
  blockUser: (userId: number, blockStatus: boolean) => void;
}

interface Account {
  userName: string;
  email: string;
  phoneNumber: string;
}

const UserRow: React.FC<UserRowProps> = ({ user, deleteUser, sendRecoveryEmail, editUserOrAdmin, blockUser }) => {
  const token = useSelector(selectToken);
  const currentUser = getUserFromToken(token || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'sendEmail' | null>(null);
  const [editUser, setEditUser] = useState<Account>({
    userName: user.userName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleConfirm = () => {
    if (confirmAction === 'delete') {
      deleteUser(user.userId);
    } else if (confirmAction === 'sendEmail') {
      sendRecoveryEmail(user.email);
    }
    setIsModalOpen(false);
  };

  const [isDisabled, setIsDisabled] = useState<boolean | ''>(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<string>('');
  const [userNameErrorMessage, setUserNameErrorMessage] = useState<string>('');

  useEffect(() => {
    setEmailErrorMessage(isValidEmail(editUser.email) ? '' : 'Not a valid email!');
    setPhoneNumberErrorMessage(isValidPhoneNumber(editUser.phoneNumber) ? '' : 'Not a valid phone number!');
    setUserNameErrorMessage(
      editUser.userName.length >= 2 ? '' : 'User name not valid! (length must be greater than 2)'
    );
    setIsDisabled(
      !(isValidEmail(editUser.email) && editUser.userName.length >= 2 && isValidPhoneNumber(editUser.phoneNumber))
    );
  }, [editUser]);

  const handleSaveChanges = () => {
    if (!isDisabled) {
      editUserOrAdmin(editUser, user.userId);
      setIsEditing(false);
    }
  };

  return (
    <Tr>
      <Td>
        {isEditing ? (
          <FormControl isInvalid={userNameErrorMessage.length > 0}>
            <Input value={editUser.userName} onChange={(e) => setEditUser({ ...editUser, userName: e.target.value })} />
            <FormErrorMessage>{userNameErrorMessage}</FormErrorMessage>
          </FormControl>
        ) : (
          user.userName
        )}
      </Td>
      <Td>
        {isEditing ? (
          <FormControl isInvalid={emailErrorMessage.length > 0}>
            <Input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
            <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
          </FormControl>
        ) : (
          user.email
        )}
      </Td>
      <Td>
        {isEditing ? (
          <FormControl isInvalid={phoneNumberErrorMessage.length > 0}>
            <Input
              value={editUser.phoneNumber}
              onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
            />
            <FormErrorMessage>{phoneNumberErrorMessage}</FormErrorMessage>
          </FormControl>
        ) : (
          user.phoneNumber
        )}
      </Td>
      <Td display="flex" justifyContent="flex-end">
        {currentUser?.email !== user.email ? (
          <>
            <Tooltip label={isEditing ? 'Save changes' : 'Edit user'}>
              <Button
                mr="3"
                bg={isEditing ? 'orange.300' : 'blue.300'}
                onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
              >
                {isEditing ? <CheckIcon /> : <EditIcon />}
              </Button>
            </Tooltip>
            <Tooltip label={user.isBlocked ? 'Unblock user' : 'Block user'}>
              <Button
                mr="3"
                bg={user.isBlocked ? 'purple.300' : 'orange.300'}
                onClick={() => {
                  blockUser(user.userId, !user.isBlocked);
                }}
              >
                {user.isBlocked ? <CheckIcon /> : <NotAllowedIcon />}
              </Button>
            </Tooltip>
            <Tooltip label="Send Recovery Email">
              <Button
                mr="3"
                bg={'green.300'}
                onClick={() => {
                  setConfirmAction('sendEmail');
                  setIsModalOpen(true);
                }}
              >
                <EmailIcon />
              </Button>
            </Tooltip>
            <Tooltip label="Delete user">
              <Button
                bg={'red.300'}
                onClick={() => {
                  setConfirmAction('delete');
                  setIsModalOpen(true);
                }}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </>
        ) : (
          <Tooltip>Current User</Tooltip>
        )}
      </Td>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        confirmAction={confirmAction}
        handleConfirm={handleConfirm}
      />
    </Tr>
  );
};

export default UserRow;
