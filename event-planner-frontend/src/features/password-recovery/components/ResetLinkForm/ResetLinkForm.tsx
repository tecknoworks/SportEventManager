import { Box, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import 'common/styles/form.scss';
import { isValidEmail } from 'common/validators/emailValidator';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { useDebounce } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { resetLinkThunk } from 'features/password-recovery/store/thunks/resetLinkThunk';
import {
  selectResetLinkIsDone,
  selectResetLinkIsSuccess,
} from 'features/password-recovery/store/selectors/resetLinkSelectors';
import { FormInfo } from 'common/components/FormInfo/FromInfo';

function ResetLinkForm() {
  const [email, setEmail] = useState<string>('');
  const [debouncedEmail] = useDebounce(email, 700);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const isDone = useSelector(selectResetLinkIsDone);
  const isSuccess = useSelector(selectResetLinkIsSuccess);

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

  const handleSubmit = () => {
    dispatch(resetLinkThunk({ email }));
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box className="form-wrapper" display="flex" width="500px" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgColor}>
      <Text color="black.500" as="b" fontSize="3xl">
        Recover password
      </Text>
      <form className="form-container">
        {!isDone && (
          <Stack spacing={5}>
            <Text color="gray.500" fontSize="md">
              Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
            </Text>
            <FormControl isInvalid={errorMessage.length > 0}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            </FormControl>

            <PrimaryButton isDisabled={isDisabled} text="Recover password" onClick={() => handleSubmit()} />
          </Stack>
        )}

        {isDone && isSuccess && (
          <FormInfo buttonText="Go to login" link="/login" message="Check your email for instructions." />
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

export default ResetLinkForm;
