import { Stack, Text } from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  message: string;
  buttonText: string;
};

export const FormInfo = ({ link, message, buttonText }: Props) => (
  <Stack spacing={5} display="flex" justifyContent="center" alignItems="center">
    <Text color="gray.500" fontSize="md">
      {message}
    </Text>
    <Link to={link}>
      <PrimaryButton text={buttonText} />
    </Link>
  </Stack>
);
