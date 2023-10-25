import React, { FormEvent, useEffect, useState } from 'react';
import 'common/styles/form.scss';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import PasswordInput from 'common/components/PasswordInput/PasswordInput';
import { useDebounce } from 'use-debounce';
import { errorPassword } from 'common/validators/passwordValidator';
import { isValidEmail } from 'common/validators/emailValidator';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';

interface Account {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const SignupForm = () => {
  const [isDisabled, setIsDisabled] = useState<boolean | ''>(true);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    useState<string>('');
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
  const [debouncedAccount] = useDebounce(account, 700);

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

  const isCPasswordEqualToConfirmPassword: boolean =
    account.password === account.confirmPassword;

  useEffect(() => {
    const errorPasswordMessage = errorPassword(debouncedAccount.password);
    const isPasswordValid: boolean = !errorPasswordMessage;
    setPasswordErrorMessage(debouncedAccount.password && errorPasswordMessage);

    const isConfirmPasswordMatchingPassword: boolean =
      debouncedAccount.password === debouncedAccount.confirmPassword;
    const errorConfirmPasswordMessage = isConfirmPasswordMatchingPassword
      ? ''
      : 'Confirm password must match the password!';
    setConfirmPasswordErrorMessage(
      debouncedAccount.confirmPassword && errorConfirmPasswordMessage
    );

    const errorEmailMessage = isValidEmail(debouncedAccount.email)
      ? ''
      : 'Not a valid email!';
    setEmailErrorMessage(debouncedAccount.email && errorEmailMessage);

    const errorPhoneNumberMessage = isValidPhoneNumber(
      debouncedAccount.phoneNumber
    )
      ? ''
      : 'Not a valid phone number!';
    setPhoneNumberErrorMessage(
      debouncedAccount.phoneNumber && errorPhoneNumberMessage
    );

    const isUserNameValid = debouncedAccount.userName.length >= 2;
    const errorUserNameMessage = isUserNameValid
      ? ''
      : 'User name not valid! (length must be greater than 2)';

    setUserNameErrorMessage(debouncedAccount.userName && errorUserNameMessage);

    setIsDisabled(
      !(
        isPasswordValid &&
        isConfirmPasswordMatchingPassword &&
        isValidEmail(debouncedAccount.email) &&
        isUserNameValid &&
        isValidPhoneNumber(debouncedAccount.phoneNumber) &&
        !checkIfEmptyInputValues() &&
        isCPasswordEqualToConfirmPassword
      )
    );
  }, [debouncedAccount]);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    console.log('Account created', account);
  }

  return (
    <Box
      className="form-wrapper"
      display="flex"
      width="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Text color="gray.500" as="b" fontSize="3xl">
        Signup
      </Text>
      <form
        className="form-container"
        onSubmit={(event) => handleSubmit(event)}
      >
        <Stack spacing={5}>
          <FormControl isRequired isInvalid={userNameErrorMessage.length > 0}>
            <FormLabel>User name</FormLabel>
            <Input
              type="text"
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
              type="email"
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
            <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={phoneNumberErrorMessage.length > 0}
          >
            <FormLabel>Phone number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="tel" />
              <Input
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAccount({ ...account, password: e.target.value })
            }
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
          <PrimaryButton
            type="submit"
            isDisabled={isDisabled ? true : false}
            text="Create account"
          />
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;