import React, { FormEvent } from 'react';
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
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInThunk } from 'features/login/store/thunks/logInThunk';
import { AppDispatch } from 'redux/store';
import { LogInDto } from 'features/login/api/dtos';

const LogInForm = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast()

  // const { loading, error } = useSelector((state: any) => state.user)

  const [userIdentifier, setUserIdentifier] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [showPw, setShowPw] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  const [usernameTouched, setUsernameTouched] = React.useState(false);
  const [passwordTouched, setPasswordTouched] = React.useState(false);

  type FormErrorMessage = { userIdentifier: string; password: string };
  const [errors, setErrors] = React.useState<FormErrorMessage>({
    userIdentifier: '',
    password: '',
  });

  React.useEffect(() => {
    let tempErrors = { userIdentifier: '', password: '' };

    const regex = /^[a-zA-Z0-9.@_-]+$/;

    tempErrors.userIdentifier = !regex.test(userIdentifier) ? 'Enter a valid username or email' : '';

    tempErrors.password = !password ? 'Required' : '';

    setErrors(tempErrors);

    setIsDisabled(Object.values(tempErrors).some((error) => error !== ''));
  }, [userIdentifier, password]);

  const handleClickShowPw = () => setShowPw(!showPw);

  const handelLogInEvent = (e: FormEvent) => {
    e.preventDefault();
    let userCredentials: LogInDto = {
      userIdentifier,
      password,
    };
    dispatch(logInThunk(userCredentials));
    toast({
      title: 'LogIn succesfully.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    navigate("/")
  };

  return (
    <Box className="form-wrapper" display="flex" width="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Text color="gray.500" as="b" fontSize="3xl">
        Log In
      </Text>
      <form className="form-container" onSubmit={(event) => handelLogInEvent(event)}>
        <Stack spacing={5}>
          <FormControl isRequired isInvalid={usernameTouched && !!errors.userIdentifier}>
            <FormLabel>User name / Email</FormLabel>
            <Input
              type="text"
              placeholder="User name / Email"
              value={userIdentifier}
              onChange={(e) => {
                setUserIdentifier(e.target.value);
                setUsernameTouched(true);
              }}
            />
            <FormErrorMessage>{errors.userIdentifier}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={passwordTouched && !!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="75px"
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
              />
              <InputRightElement width="75px">
                <Button h="28px" size="sm" onClick={handleClickShowPw}>
                  {showPw ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          {/* {
            error && (<div>{error}</div>)
          } */}
          <Button type="submit" colorScheme="purple" size="md" variant="solid" isDisabled={isDisabled}>
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
