import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  key: number;
  linkTo: string;
}

const NavLink = (props: Props) => {
  const { children, key, linkTo } = props;

  return (
    <Box
      key={key}
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'whiteAlpha.300',
      }}
      href={linkTo}
      fontWeight="semibold"
    >
      {children}
    </Box>
  );
};

export default NavLink;
