import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import 'common/styles/form.scss';
import { isValidEmail } from 'common/validators/emailValidator';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { useDebounce } from 'use-debounce';

function PasswordRecoveryForm() {
  const [email, setEmail] = useState<string>('');
  const [debouncedEmail] = useDebounce(email, 700);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!debouncedEmail) return;
    if (isValidEmail(debouncedEmail)) {
      setIsDisabled(false);
      setErrorMessage('');
    } else {
      setIsDisabled(true);
      setErrorMessage('Please enter a valid email address.');
    }
  }, [debouncedEmail]);

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
        Recover password
      </Text>

      <form className="form-container">
        <Stack spacing={5}>
          <Text color="gray.500" fontSize="md">
            Forgot your account’s password? Enter your email address and we’ll
            send you a recovery link.
          </Text>
          <FormControl isInvalid={errorMessage.length > 0}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>

          <PrimaryButton isDisabled={isDisabled} text="Recover password" />
        </Stack>
      </form>
    </Box>
  );
}

export default PasswordRecoveryForm;
