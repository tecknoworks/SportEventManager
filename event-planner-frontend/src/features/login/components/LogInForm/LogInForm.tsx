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
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { logInThunk } from 'features/login/store/thunks/logInThunk';
import { AppDispatch } from 'redux/store';
import { LogInDto } from 'features/login/api/dtos';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLogInStateLoading } from 'features/login/store/selectors/logInSelectors';
import { createAssistantThunk } from 'features/chat/store/thunks/createAssistantThunk';
import { createThreadThunk } from 'features/chat/store/thunks/createThreadThunk';

const LogInForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLogInStateLoading);

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

  const setupAssistantAndThread = async () => {
    if (localStorage.getItem('threadId') && localStorage.getItem('assistantId')) return;

    const assistantResponse = await dispatch(createAssistantThunk());
    const threadResponse = await dispatch(createThreadThunk());

    const assistantId = assistantResponse.payload?.id;
    const threadId = threadResponse.payload?.id;

    if (assistantId && threadId) {
      localStorage.setItem('threadId', threadId);
      localStorage.setItem('assistantId', assistantId);
    }
  };

  const handelLogInEvent = (e: FormEvent) => {
    e.preventDefault();
    let userCredentials: LogInDto = {
      userIdentifier,
      password,
    };
    dispatch(logInThunk(userCredentials)).then((response) => {
      if (response.payload) {
        setupAssistantAndThread();
        <Navigate to="/" replace />;
      }
    });
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box className="form-wrapper" display="flex" width="500px" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgColor}>
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
          <Button
            type="submit"
            colorScheme="purple"
            size="md"
            variant="solid"
            isDisabled={isDisabled}
            isLoading={loading}
          >
            Log In
          </Button>
          <Text>
            Don't have an account?{' '}
            <Link color="purple" href="/signup">
              Sign up
            </Link>
          </Text>
          <Button
            variant="text"
            size="sm"
            onClick={() => {
              navigate('/recover-password');
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
