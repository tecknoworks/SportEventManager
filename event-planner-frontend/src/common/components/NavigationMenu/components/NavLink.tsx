import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  linkTo: string;
}

const NavLink = (props: Props) => {
  const { children, linkTo } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'purple.200',
      }}
      href={linkTo}
      fontWeight="semibold"
    >
      {children}
    </Box>
  );
};

export default NavLink;
