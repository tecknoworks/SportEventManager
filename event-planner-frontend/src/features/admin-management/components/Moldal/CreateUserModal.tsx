import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  FormErrorMessage
} from '@chakra-ui/react';
import PasswordInput from 'common/components/PasswordInput/PasswordInput';
import { isValidEmail } from 'common/validators/emailValidator';
import { validatePassword } from 'common/validators/passwordValidator';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';
import { useState,useEffect } from 'react';

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  addUser: () => void;
  isValid: boolean;
  newUser: any;
  setNewUser: (user: any) => void;
};

const CreateUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, addUser, isValid, newUser, setNewUser }) => {



  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

  const [debouncedAccount] = useDebounce(account, 700);

  useEffect(() => {
    const validateFields = () => {
      const errorPasswordMessage = validatePassword(debouncedAccount.password);
      setPasswordErrorMessage(debouncedAccount.password && errorPasswordMessage);
  
      const isPasswordValid = !errorPasswordMessage;
      
      // Validate Confirm Password
      const isConfirmPasswordValid = validateConfirmPassword(debouncedAccount.password, debouncedAccount.confirmPassword);
      setConfirmPasswordErrorMessage(debouncedAccount.confirmPassword && (isConfirmPasswordValid ? '' : 'Confirm password must match the password!'));
  
      // Validate Email
      const isEmailValid = isValidEmail(debouncedAccount.email);
      setEmailErrorMessage(debouncedAccount.email && (isEmailValid ? '' : 'Not a valid email!'));
  
      // Validate Phone Number
      const isPhoneNumberValid = isValidPhoneNumber(debouncedAccount.phoneNumber);
      setPhoneNumberErrorMessage(debouncedAccount.phoneNumber && (isPhoneNumberValid ? '' : 'Not a valid phone number!'));
  
      // Validate User Name
      const isUserNameValid = validateUserName(debouncedAccount.userName);
      setUserNameErrorMessage(debouncedAccount.userName && (isUserNameValid ? '' : 'User name not valid! (length must be greater than 2)'));
  
      // Final check to enable/disable button
      setIsDisabled(!(isPasswordValid && isConfirmPasswordValid && isEmailValid && isPhoneNumberValid && isUserNameValid));
    };
  
    const validateConfirmPassword = (password, confirmPassword) => {
      return password === confirmPassword;
    };
  
    const validateUserName = (userName) => {
      return userName.length >= 2;
    };
  
    validateFields();
  
  }, [debouncedAccount]);
  

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            mb="6"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => {
              setNewUser({ ...newUser, name: e.target.value });
              // setTouchedFields({ ...touchedFields, name: true });
            }}
          />
          <Input
            mb="6"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
                setTouchedFields({ ...touchedFields, email: true });
              }}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          
          <Input
            mb="6"
            placeholder="Phone"
            value={newUser.phoneNumber}
            onChange={(e) => {
                setNewUser({ ...newUser, phoneNumber: e.target.value });
                setTouchedFields({ ...touchedFields, phoneNumber: true });
              }}
            />
            <FormErrorMessage>{phoneError}</FormErrorMessage>

          <Select placeholder="Roles:">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Select>

          <PasswordInput
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
              setTouchedFields({ ...touchedFields, password: true });
            }}
            show={showPassword}
            onToggleShow={() => {
              setShowPassword(!showPassword);
            }}
            placeholder="Password"
            errorMessage={''}
            isRequired={true}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              addUser();
              onClose();
            }}
            isDisabled={!isValid}
          >
            Confirm
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
