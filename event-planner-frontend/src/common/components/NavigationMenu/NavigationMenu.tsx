import { useEffect, useState } from 'react';
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
  Text,
  Stack,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NavLink from './components/NavLink';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { logout } from 'features/login/store/slices/logInSlice';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { getProfileThunk } from 'features/profile/store/thunks/getProfileThunk';
import { selectProfile } from 'features/profile/store/selectors/profileSelector';
import { deleteAssitantThunk } from 'features/chat/store/thunks/deleteAssistantThunk';
import { deleteThreadThunk } from 'features/chat/store/thunks/deleteThreadThunk';
import { IoSunny } from "react-icons/io5";
import Notifications from 'features/notifications/Notifications';
import {
  connectNotification,
  disconnectNotification,
  registerNotificationReceived,
  unregisterNotificationReceived,
} from 'services/notificationService';
import { addNotificationMessage } from './store/notificationSlice';
import { handleGenericSuccess } from 'services/notificationHandlingService';

type LinkType = {
  key: number;
  title: string;
  availableForUser: boolean;
  linkTo: string;
};

const NavigationMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificationsDisclosure = useDisclosure();

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
      availableForUser: false,
      linkTo: '/create-event',
    },
    {
      key: 4,
      title: 'Chat',
      availableForUser: false,
      linkTo: '/chat',
    },
    {
      key: 5,
      title: 'My Events',
      availableForUser: false,
      linkTo: '/my-events',
    },
    {
      key: 6,
      title: 'Browse Events',
      availableForUser: true,
      linkTo: '/browseevents',
    },
  ];

  const token = useSelector(selectToken);
  const profile = useSelector(selectProfile);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (token) {
      const user = getUserFromToken(token);
      dispatch(getProfileThunk(user?.userId || ''));
      setIsAdmin(user?.role === 'Admin');
      setIsLoggedIn(!!token);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [token]);

  const navbarBgColor = colorMode === 'dark' ? 'dark.navbar' : 'light.navbar';
  useEffect(() => {
    connectNotification();
    registerNotificationReceived((message: string) => {
      dispatch(addNotificationMessage(message));
      handleGenericSuccess('You have new notifications');
    });

    return () => {
      unregisterNotificationReceived((message: string) => {
        console.log('Unregistered callback:', message);
      });
      disconnectNotification();
    };
  }, [dispatch]);

  return (
    <Box height="64px" width="100%" top="0" bg={navbarBgColor} px={4} >
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
          <Box color={colorMode} fontWeight="semibold">
            SportSpark
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(
              (link) =>
                (link.availableForUser ||
                  (isLoggedIn && !link.availableForUser && (isAdmin || link.title !== 'Admin User Management'))) && (
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
                size="sm"
                bgColor="#610c9f"
                name={isLoggedIn ? profile?.firstName + ' ' + profile?.lastName : ''}
                src={isLoggedIn ? profile?.profilePhoto : ''}
              />
            </MenuButton>
            <Button onClick={toggleColorMode} ml="4">
              {colorMode === 'light' ? <MoonIcon /> : <IoSunny />}
            </Button>
            <MenuList zIndex="9">
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate('/edit-profile');
                    }}
                  >
                    Profile: &nbsp;
                    <Text maxW="120px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      {profile?.userName}
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate('/joined-events');
                    }}
                  >
                    All events you joined
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={notificationsDisclosure.onOpen}>Notifications</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={async () => {
                      await dispatch(deleteAssitantThunk(localStorage.getItem('assistantId') || ''));
                      await dispatch(deleteThreadThunk(localStorage.getItem('threadId') || ''));
                      dispatch(logout());
                      localStorage.removeItem('threadId');
                      localStorage.removeItem('assistantId');
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
                (link.availableForUser ||
                  (isLoggedIn && !link.availableForUser && (isAdmin || link.title !== 'Admin User Management'))) && (
                  <NavLink key={link.key} linkTo={link.linkTo}>
                    {link.title}
                  </NavLink>
                )
            )}
          </Stack>
        </Box>
      ) : null}
      {notificationsDisclosure.isOpen && (
        <Notifications isOpen={notificationsDisclosure.isOpen} onClose={notificationsDisclosure.onClose} />
      )}
    </Box>
  );
};

export default NavigationMenu;
