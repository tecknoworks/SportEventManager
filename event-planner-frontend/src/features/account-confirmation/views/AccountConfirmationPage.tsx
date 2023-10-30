import { Box, Text } from '@chakra-ui/react';
import { FormInfo } from 'common/components/FormInfo/FromInfo';
import 'common/styles/form.scss';
import 'common/styles/form-page.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAccountConfirmationIsDone,
  selectAccountConfirmationIsSuccess,
} from '../store/selectors/accountConfirmationSelectors';
import { accountConfirmationThuk } from '../store/thunks/accountConfirmationThunk';

const useURLParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = encodeURIComponent(params.get('token') || '');
  const email = decodeURIComponent(params.get('email') || '');

  return { token, email };
};

const AccountConfirmationPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const isDone = useSelector(selectAccountConfirmationIsDone);
  const isSuccess = useSelector(selectAccountConfirmationIsSuccess);
  const [message, setMessage] = useState<string>('');
  const { token, email } = useURLParams();

  useEffect(() => {
    dispatch(
      accountConfirmationThuk({
        email,
        token,
      })
    );
  }, []);

  useEffect(() => {
    setMessage(
      isDone && isSuccess
        ? 'Your account has been confirmed! You can login now.'
        : "Something went wrong! Please check the link if it's a valid one."
    );
  }, [isDone, isSuccess]);

  return (
    <Box className="form-page-wrapper" height="100vh" overflowY="hidden" bgGradient="linear(to-r, #610C9F, #E95793)">
      <Box className="form-wrapper" display="flex" width="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text color="black.500" as="b" fontSize="3xl">
          {isDone && isSuccess ? 'Account confirmed' : 'Something went Wrong'}
        </Text>
        <FormInfo buttonText="Go to login" link="/login" message={message} />
      </Box>
    </Box>
  );
};

export default AccountConfirmationPage;
