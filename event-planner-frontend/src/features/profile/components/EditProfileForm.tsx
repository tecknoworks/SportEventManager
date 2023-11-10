import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormErrorMessage,
  useMediaQuery,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import SecondaryButton from 'common/components/buttons/SecondaryButton';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../store/thunks/getProfileThunk';
import { useEffect, useState } from 'react';
import { selectProfile, selectProfileIsLoading } from '../store/selectors/profileSelector';
import { GetUserProfileDto, UpdateUserProfileDto } from '../api/dtos';
import { formatDate } from 'common/helpers/dateFormatter';
import { updateProfileThunk } from '../store/thunks/updateProfileThunk';
import Loader from 'common/components/Loader/Loader';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { selectToken } from 'features/login/store/selectors/logInSelectors';

const EditProfileForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileIsLoading);
  const defaultProfile: GetUserProfileDto = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: new Date(1976),
    country: '',
    county: '',
    city: '',
    profilePhoto: '',
  };

  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');

  const [currentProfile, setCurrentProfile] = useState<GetUserProfileDto>(defaultProfile);
  const [isImageWidgetLoading, setImageWidgetLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isMobile] = useMediaQuery('(max-width: 1037px)');

  useEffect(() => {
    dispatch(getProfileThunk(user?.userId || ''));
  }, []);

  useEffect(() => {
    if (profile) setCurrentProfile(profile);
  }, [profile]);

  useEffect(() => {
    if (!isValidPhoneNumber(currentProfile.phoneNumber || '')) {
      setPhoneNumberError('Please enter a valid phone number.');
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      setPhoneNumberError('');
    }
  }, [currentProfile]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageUpload = () => {
    const cloudinary = (window as any).cloudinary;
    const widget = cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      },
      (error: any, result: any) => {
        setImageWidgetLoading(false);
        if (!error && result && result.event === 'success') {
          setCurrentProfile({
            ...currentProfile,
            profilePhoto: result.info.secure_url,
          });
        }
      }
    );
    setImageWidgetLoading(true);
    widget.open();
  };

  const handleImageRemove = () => {
    setCurrentProfile({
      ...currentProfile,
      profilePhoto: undefined,
    });
  };

  const handleSubmitChanges = () => {
    const data: UpdateUserProfileDto = {
      phoneNumber: currentProfile.phoneNumber,
      firstName: currentProfile.firstName,
      lastName: currentProfile.lastName,
      dateOfBirth: currentProfile.dateOfBirth,
      country: currentProfile.country,
      county: currentProfile.county,
      city: currentProfile.city,
      profilePhoto: currentProfile.profilePhoto,
    };
    dispatch(updateProfileThunk({ userId: user?.userId || '', data }));
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
      {(isLoading || isImageWidgetLoading) && <Loader />}
      <Stack
        spacing={6}
        p={6}
        w={!isMobile ? '50vw' : '90%'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        my={12}
        margin="0"
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <Stack
          flexDirection={!isMobile ? 'row' : 'column'}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          gap={!isMobile ? '45px' : '0px'}
        >
          <Stack width="100%">
            <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar
                    name={currentProfile?.firstName + ' ' + currentProfile?.lastName}
                    size="xl"
                    src={currentProfile.profilePhoto}
                    bgColor="#610c9f"
                  >
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon onClick={onOpen} />}
                    />
                  </Avatar>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Confirm Removal</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>Are you sure you want to remove your profile photo?</ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="red"
                          mr={3}
                          onClick={() => {
                            handleImageRemove();
                            onClose();
                          }}
                        >
                          Remove
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Center>
                <Center w="full">
                  <Button w="full" onClick={() => handleImageUpload()}>
                    Change Icon
                  </Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={currentProfile.firstName}
                onChange={(e) => setCurrentProfile({ ...currentProfile, firstName: e.target.value })}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={currentProfile.lastName}
                onChange={(e) => setCurrentProfile({ ...currentProfile, lastName: e.target.value })}
              />
            </FormControl>
            <FormControl id="phoneNumber" isRequired isInvalid={phoneNumberError.length > 0}>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon children="tel" />
                <Input
                  placeholder="0720146781"
                  _placeholder={{ color: 'gray.500' }}
                  type="number"
                  value={currentProfile.phoneNumber}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, phoneNumber: e.target.value })}
                />
              </InputGroup>
              <FormErrorMessage>{phoneNumberError}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack width="100%" marginTop={!isMobile ? '57px' : '0px'}>
            <FormControl id="DateOfBirth">
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                value={formatDate(currentProfile.dateOfBirth || new Date())}
                onChange={(e) => setCurrentProfile({ ...currentProfile, dateOfBirth: new Date(e.target.value) })}
              />
            </FormControl>
            <FormControl id="Country">
              <FormLabel>Country</FormLabel>
              <Input
                placeholder="Country"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={currentProfile.country}
                onChange={(e) => setCurrentProfile({ ...currentProfile, country: e.target.value })}
              />
            </FormControl>
            <FormControl id="County">
              <FormLabel>County</FormLabel>
              <Input
                placeholder="County"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={currentProfile.county}
                onChange={(e) => setCurrentProfile({ ...currentProfile, county: e.target.value })}
              />
            </FormControl>
            <FormControl id="City">
              <FormLabel>City</FormLabel>
              <Input
                placeholder="City"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={currentProfile.city}
                onChange={(e) => setCurrentProfile({ ...currentProfile, city: e.target.value })}
              />
            </FormControl>
          </Stack>
        </Stack>

        <Stack spacing={6} direction={['column', 'row']}>
          <PrimaryButton text="Submit" w="full" isDisabled={isDisabled} onClick={() => handleSubmitChanges()} />
          <SecondaryButton text="Cancel" w="full" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditProfileForm;
