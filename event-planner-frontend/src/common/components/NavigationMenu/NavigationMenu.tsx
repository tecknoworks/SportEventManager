import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import NavLink from './components/NavLink';
import { useNavigate } from 'react-router-dom';

type LinkType = {
  key: number;
  title: string;
  availableForUser: boolean;
  linkTo: string;
};

const NavigationMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const Links: LinkType[] = [
    {
      key: 1,
      title: 'Home Page',
      availableForUser: true,
      linkTo: '/homepage',
    },
    {
      key: 2,
      title: 'Admin User Management',
      availableForUser: false,
      linkTo: '/adminusermanagement',
    },
  ];
  const isLoggedIn = false;
  const isAdmin = true;

  return (
    <Box position="fixed" width="100%" top="0" zIndex="1" bg={'whiteAlpha.800'} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          backgroundColor="whiteAlpha.700"
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box color="purple" fontWeight="semibold">
            EventPlanner
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(
              (link) =>
                (link.availableForUser || (!link.availableForUser && isLoggedIn && isAdmin)) && (
                  <NavLink key={link.key} linkTo={link.linkTo}>
                    {link.title}
                  </NavLink>
                )
            )}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar
                size={'sm'}
                src={
                  isLoggedIn
                    ? 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    : ''
                }
                border={!isLoggedIn ? '1px' : '0px'}
              />
            </MenuButton>
            <MenuList>
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate('/profile');
                    }}
                  >
                    Profile Page
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      navigate('/signup');
                    }}
                  >
                    Signup
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(
              (link) =>
                (link.availableForUser || (!link.availableForUser && isLoggedIn && isAdmin)) && (
                  <NavLink key={link.key} linkTo={link.linkTo}>
                    {link.title}
                  </NavLink>
                )
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default NavigationMenu;
