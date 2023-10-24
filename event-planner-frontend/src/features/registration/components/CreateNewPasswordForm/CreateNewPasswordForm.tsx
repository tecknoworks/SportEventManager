import { Box, Stack, Text } from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import React, { useEffect, useState } from 'react';
import { validatePassword } from 'common/validators/passwordValidator';
import { useDebounce } from 'use-debounce';
import PasswordInput from '../PasswordInput/PasswordInput';

function CreateNewPasswordForm() {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const [debouncedPasswords] = useDebounce(passwords, 700);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>('');

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    let isPasswordValid = false;
    let doPasswordsMatch = false;

    if (debouncedPasswords.password) {
      const passwordValidationResult = validatePassword(
        debouncedPasswords.password
      );
      setPasswordErrorMessage(
        passwordValidationResult.isValid ? '' : passwordValidationResult.message
      );
      isPasswordValid = passwordValidationResult.isValid;
    }

    if (debouncedPasswords.confirmPassword) {
      doPasswordsMatch =
        debouncedPasswords.password === debouncedPasswords.confirmPassword;
      setConfirmPasswordErrorMessage(
        doPasswordsMatch ? '' : 'Confirm password must match the password!'
      );
    }
    setIsDisabled(!(isPasswordValid && doPasswordsMatch));
  }, [debouncedPasswords]);

  return (
    <Box
      className="form-wrapper"
      display="flex"
      width="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Text color="black.500" as="b" fontSize="3xl">
        Create a new password
      </Text>

      <form className="form-container">
        <Stack spacing={5}>
          <Text color="gray.500" fontSize="md">
            New password must be minimum 12 characters long, with at least 1
            uppercase letter,1 number and 1 special character.
          </Text>
          <PasswordInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswords({ ...passwords, password: e.target.value })
            }
            show={passwords.showPassword}
            onToggleShow={() =>
              setPasswords({
                ...passwords,
                showPassword: !passwords.showPassword,
              })
            }
            placeholder="Enter password"
            errorMessage={passwordErrorMessage}
          />
          <PasswordInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            show={passwords.showConfirmPassword}
            onToggleShow={() =>
              setPasswords({
                ...passwords,
                showConfirmPassword: !passwords.showConfirmPassword,
              })
            }
            placeholder="Confirm password"
            errorMessage={confirmPasswordErrorMessage}
          />
          <PrimaryButton isDisabled={isDisabled} text="Set new password" />
        </Stack>
      </form>
    </Box>
  );
}

export default CreateNewPasswordForm;
