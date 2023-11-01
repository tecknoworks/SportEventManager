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
  FormErrorMessage,
  useToast, Text, Stack, FormControl, FormLabel, InputGroup, InputLeftAddon
} from '@chakra-ui/react';
import PasswordInput from 'common/components/PasswordInput/PasswordInput';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { isValidEmail } from 'common/validators/emailValidator';
import { validatePassword } from 'common/validators/passwordValidator';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';
import { UserDto } from 'features/registration/api/Dtos';
import { createUser } from 'features/registration/thunks/signupThunks';
import { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { useDebounce } from 'use-debounce';


type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // addUser: () => void;
  newUser: any;
  setNewUser: (user: any) => void;
};

interface Account {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}


const CreateUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, newUser, setNewUser }) => {



  const [isDisabled, setIsDisabled] = useState<boolean | ''>(true);
  const dispatch: AppDispatch = useDispatch();
  // const userStatus = useSelector(selectUserStatus);
  // const userError = useSelector(selectUserError);
  const [errorBe, setErrorBe] = useState<object[]>([]);
  const toast = useToast();


  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<string>('');
  const [userNameErrorMessage, setUserNameErrorMessage] = useState<string>('');

  const [account, setAccount] = useState<Account>({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [debouncedAccount] = useDebounce(account, 1000);

  const checkIfEmptyInputValues = (): boolean => {
    if (
      account.userName !== '' &&
      account.email !== '' &&
      account.phoneNumber !== '' &&
      account.password !== '' &&
      account.confirmPassword !== ''
    ) {
      return false;
    }
    return true;
  };

  const isPasswordEqualToConfirmPassword: boolean = account.password === account.confirmPassword;

  useEffect(() => {
    const errorPasswordMessage = validatePassword(debouncedAccount.password);
    const isPasswordValid: boolean = !errorPasswordMessage;
    setPasswordErrorMessage(debouncedAccount.password && errorPasswordMessage);

    const isConfirmPasswordMatchingPassword: boolean = debouncedAccount.password === debouncedAccount.confirmPassword;
    const errorConfirmPasswordMessage = isConfirmPasswordMatchingPassword
      ? ''
      : 'Confirm password must match the password!';
    setConfirmPasswordErrorMessage(debouncedAccount.confirmPassword && errorConfirmPasswordMessage);

    const errorEmailMessage = isValidEmail(debouncedAccount.email) ? '' : 'Not a valid email!';
    setEmailErrorMessage(debouncedAccount.email && errorEmailMessage);

    const errorPhoneNumberMessage = isValidPhoneNumber(debouncedAccount.phoneNumber) ? '' : 'Not a valid phone number!';
    setPhoneNumberErrorMessage(debouncedAccount.phoneNumber && errorPhoneNumberMessage);

    const isUserNameValid = debouncedAccount.userName.length >= 2;
    const errorUserNameMessage = isUserNameValid ? '' : 'User name not valid! (length must be greater than 2)';

    setUserNameErrorMessage(debouncedAccount.userName && errorUserNameMessage);

    setIsDisabled(
      !(
        isPasswordValid &&
        isConfirmPasswordMatchingPassword &&
        isValidEmail(debouncedAccount.email) &&
        isUserNameValid &&
        isValidPhoneNumber(debouncedAccount.phoneNumber) &&
        !checkIfEmptyInputValues() &&
        isPasswordEqualToConfirmPassword
      )
    );
  }, [debouncedAccount]);

  useEffect(() => {
    setErrorBe([]);
  }, []);

  const resetInputValues = () => {
    setErrorBe([]);
    setAccount({
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  //NU AM STATUS INCA

  // useEffect(() => {
  //   if (userStatus === 'succeded') {
  //     dispatch(resetStore());
  //     resetInputValues();
  //     toast({
  //       title: 'Account created.',
  //       description: "We've created your account for you. Check your email to confirm your account",
  //       status: 'success',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   } else {
  //     setErrorBe(userError);
  //   }
  // }, [userStatus]);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const data: UserDto = {
      userName: account.userName,
      email: account.email,
      phoneNumber: account.phoneNumber,
      password: account.password,
    };
    dispatch(createUser(data));
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form className="form-container" onSubmit={(event) => handleSubmit(event)}>
            <Stack spacing={5}>
              <FormControl isRequired isInvalid={userNameErrorMessage.length > 0}>
                <FormLabel>User name</FormLabel>
                <Input
                  type="text"
                  value={account.userName}
                  placeholder="User name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAccount({ ...account, userName: e.target.value })
                  }
                />
                <FormErrorMessage>{userNameErrorMessage}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={emailErrorMessage.length > 0}>
                <FormLabel>Email address</FormLabel>
                <Input
                  value={account.email}
                  type="email"
                  placeholder="Email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount({ ...account, email: e.target.value })}
                />
                <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={phoneNumberErrorMessage.length > 0}>
                <FormLabel>Phone number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="tel" />
                  <Input
                    value={account.phoneNumber}
                    type="text"
                    placeholder="Phone number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAccount({
                        ...account,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </InputGroup>
                <FormErrorMessage>{phoneNumberErrorMessage}</FormErrorMessage>
              </FormControl>
              <PasswordInput
                value={account.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount({ ...account, password: e.target.value })}
                show={account.showPassword}
                onToggleShow={() =>
                  setAccount({
                    ...account,
                    showPassword: !account.showPassword,
                  })
                }
                placeholder="Password"
                errorMessage={passwordErrorMessage}
                isRequired={true}
              />
              <PasswordInput
                value={account.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAccount({ ...account, confirmPassword: e.target.value })
                }
                show={account.showConfirmPassword}
                onToggleShow={() =>
                  setAccount({
                    ...account,
                    showConfirmPassword: !account.showConfirmPassword,
                  })
                }
                placeholder="Confirm password"
                errorMessage={confirmPasswordErrorMessage}
                isRequired={true}
              />
              <Select placeholder="Roles:">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
              {errorBe?.map((err: any) => (
                <Text key={err.code} color="red.500" as="b" fontSize="sm" textAlign="center">
                  {err.description}
                </Text>
              ))}
              <PrimaryButton type="submit" isDisabled={isDisabled ? true : false} text="Create account" />
            </Stack>
            {/* <Button
              onClick={() => {
                addUser();
                onClose();
              }}
            >
              Confirm
            </Button> */}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => { onClose(); resetInputValues() }}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
