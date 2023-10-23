import React from 'react';
import 'common/styles/form.scss';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const navigate = useNavigate();

  const [showPw, setShowPw] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  const [userNameOrEmail, setUserNameOrEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  type FormErrorMessage = { userNameOrEmail: string; password: string };
  const [errors, setErrors] = React.useState<FormErrorMessage>({
    userNameOrEmail: '',
    password: '',
  });

  React.useEffect(() => {
    let tempErrors = { userNameOrEmail: '', password: '' };

    const regex =
      /^(?:[A-Z\d][A-Z\d_-]{5,30}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i;

    if (!regex.test(userNameOrEmail)) {
      tempErrors.userNameOrEmail = 'Enter a valid username or email';
    }

    if (!password) {
      tempErrors.password = 'Required';
    }
    setErrors(tempErrors);

    setIsDisabled(Object.values(tempErrors).some((error) => error !== ''));
  }, [userNameOrEmail, password]);

  const handleClickShowPw = () => setShowPw(!showPw);

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
        Log In
      </Text>
      <form className="form-container">
        <Stack spacing={5}>
          <FormControl isRequired isInvalid={!!errors.userNameOrEmail}>
            <FormLabel>User name / Email</FormLabel>
            <Input
              type="text"
              placeholder="User name / Email"
              onChange={(e) => setUserNameOrEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.userNameOrEmail}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="75px"
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="75px">
                <Button h="28px" size="sm" onClick={handleClickShowPw}>
                  {showPw ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            color="#610C9F"
            size="md"
            variant="solid"
            isDisabled={isDisabled}
          >
            Log In
          </Button>
          <Button
            variant="text"
            size="sm"
            onClick={() => {
              navigate('/');
            }}
          >
            Forgot password?
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LogInForm;
