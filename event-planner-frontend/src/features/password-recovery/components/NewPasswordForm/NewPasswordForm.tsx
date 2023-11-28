import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { Box, Stack, Text, useColorMode } from '@chakra-ui/react';

import PrimaryButton from 'common/components/buttons/PrimaryButton';
import PasswordInput from 'common/components/PasswordInput/PasswordInput';
import { validatePassword } from 'common/validators/passwordValidator';

import { AppDispatch } from 'redux/store';
import { newPasswordThunk } from 'features/password-recovery/store/thunks/newPasswordThunk';
import {
  selectNewPasswordIsDone,
  selectNewPasswordIsSuccess,
} from 'features/password-recovery/store/selectors/newPasswordSelectors';
import { FormInfo } from 'common/components/FormInfo/FromInfo';

const useURLParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = decodeURIComponent(params.get('token') || '');
  const email = decodeURIComponent(params.get('email') || '');

  return { token, email };
};

function NewPasswordForm() {
  const dispatch: AppDispatch = useDispatch();
  const isDone = useSelector(selectNewPasswordIsDone);
  const isSuccess = useSelector(selectNewPasswordIsSuccess);

  const { token, email } = useURLParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [debouncedPasswords] = useDebounce(passwords, 700);

  useEffect(() => {
    const errorPassword = validatePassword(debouncedPasswords.password);
    const isPasswordValid: boolean = !errorPassword;
    setPasswordErrorMessage(debouncedPasswords.password && errorPassword);

    const doPasswordsMatch: boolean = debouncedPasswords.password === debouncedPasswords.confirmPassword;

    const errorConfirmPassword = doPasswordsMatch ? '' : 'Confirm password must match the password!';
    setConfirmPasswordErrorMessage(debouncedPasswords.confirmPassword && errorConfirmPassword);

    setIsDisabled(!(isPasswordValid && doPasswordsMatch));
  }, [debouncedPasswords]);

  const handleSetNewPassword = () => {
    dispatch(
      newPasswordThunk({
        email,
        token,
        password: debouncedPasswords.password,
        confirmPassword: debouncedPasswords.confirmPassword,
      })
    );
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box className="form-wrapper" display="flex" width="500px" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgColor}>
      <Text color="black.500" as="b" fontSize="3xl">
        Create a new password
      </Text>

      <form>
        {!isDone && (
          <Stack spacing={5}>
            <Text color="gray.500" fontSize="md">
              New password must be minimum 12 characters long, with at least 1 uppercase letter,1 number and 1 special
              character.
            </Text>
            <PasswordInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswords({ ...passwords, password: e.target.value })
              }
              isRequired={true}
              show={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
              placeholder="Enter password"
              errorMessage={passwordErrorMessage}
            />
            <PasswordInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              isRequired={true}
              show={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm password"
              errorMessage={confirmPasswordErrorMessage}
            />
            <PrimaryButton isDisabled={isDisabled} text="Set new password" onClick={handleSetNewPassword} />
          </Stack>
        )}

        {isDone && isSuccess && (
          <FormInfo
            buttonText="Go to login"
            link="/login"
            message="You have successfully reset you password. Login now to access the platform !"
          />
        )}

        {isDone && !isSuccess && (
          <FormInfo
            buttonText="Go to homepage"
            link="/homepage"
            message="Ooops. Something went wrong. Please try again later."
          />
        )}
      </form>
    </Box>
  );
}

export default NewPasswordForm;
