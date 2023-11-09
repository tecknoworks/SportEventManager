import React, { useContext, useEffect, useState } from 'react';
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
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { logout } from 'features/login/store/slices/logInSlice';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { getProfileThunk } from 'features/profile/store/thunks/getProfileThunk';
import { selectProfile } from 'features/profile/store/selectors/profileSelector';

type LinkType = {
  key: number;
  title: string;
  availableForUser: boolean;
  linkTo: string;
};

const NavigationMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const Links: LinkType[] = [
    {
      key: 1,
      title: 'Home Page',
      availableForUser: true,
      linkTo: '/',
    },
    {
      key: 2,
      title: 'Admin User Management',
      availableForUser: false,
      linkTo: '/admin',
    },
    {
      key: 3,
      title: 'Create event',
      availableForUser: true,
      linkTo: '/create-event',
    },
  ];

  const token = useSelector(selectToken);
  const profile = useSelector(selectProfile);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const user = getUserFromToken(token);
      dispatch(getProfileThunk(user?.userId || ''));
      setIsAdmin(user?.role === 'User' ? false : true);
      setIsLoggedIn(!!token);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [token]);

  return (
    <Box width="100%" top="0" bg={'whiteAlpha.800'} px={4}>
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
          <Box color="#610c9f" fontWeight="semibold">
            EventPlanner
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(
              (link, index) =>
                (link.availableForUser || (!link.availableForUser && isLoggedIn && isAdmin)) && (
                  <NavLink key={index} linkTo={link.linkTo}>
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
                size="sm"
                bgColor="#610c9f"
                name={isLoggedIn ? profile?.firstName + ' ' + profile?.lastName : ''}
                src={isLoggedIn ? profile?.profilePhoto : ''}
              />
            </MenuButton>
            <MenuList zIndex="9">
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate('/edit-profile');
                    }}
                  >
                    Profile Page
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                      navigate('/');
                    }}
                  >
                    Logout
                  </MenuItem>
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
        <Box
          position="absolute"
          left="0"
          pb={4}
          bg={'whiteAlpha.800'}
          textAlign="left"
          padding="20px"
          width="100%"
          zIndex="9"
          display={{ md: 'none' }}
        >
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
