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
  Container,
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
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import SecondaryButton from 'common/components/buttons/SecondaryButton';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../store/thunks/getProfileThunk';
import { useEffect, useState } from 'react';
import { selectProfile } from '../store/selectors/profileSelector';
import { GetUserProfileDto, UpdateUserProfileDto } from '../api/dtos';
import { defaultProfile } from '../api/dtos';
import { formatDate } from 'common/helpers/dateFormatter';
import { updateProfileThunk } from '../store/thunks/updateProfileThunk';

const MOCK_USER_ID = '5a56cef4-71b6-4301-a69b-f0a60ed5bcdf'; //TODO: get user id from JWT token

const EditProfileForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [currentProfile, setCurrentProfile] = useState<GetUserProfileDto>(defaultProfile);

  useEffect(() => {
    dispatch(getProfileThunk(MOCK_USER_ID));
  }, []);

  useEffect(() => {
    if (profile) setCurrentProfile(profile);
  }, [profile]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageUpload = () => {
    const cloudinary = (window as any).cloudinary;
    const widget = cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setCurrentProfile({
            ...currentProfile,
            profilePhoto: result.info.secure_url,
          });
        }
      }
    );

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
    dispatch(updateProfileThunk(data));
  };

  return (
    <Container>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar
                name={currentProfile.firstName + ' ' + currentProfile.lastName}
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
        <FormControl id="firstName" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={currentProfile.firstName}
            onChange={(e) => setCurrentProfile({ ...currentProfile, firstName: e.target.value })}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Last Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={currentProfile.lastName}
            onChange={(e) => setCurrentProfile({ ...currentProfile, lastName: e.target.value })}
          />
        </FormControl>
        <FormControl id="phoneNumber" isRequired>
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
        </FormControl>
        <FormControl id="DateOfBirth" isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            value={formatDate(currentProfile.dateOfBirth || new Date())}
            onChange={(e) => setCurrentProfile({ ...currentProfile, dateOfBirth: new Date(e.target.value) })}
          />
        </FormControl>
        <FormControl id="Country" isRequired>
          <FormLabel>Country</FormLabel>
          <Input
            placeholder="Country"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={currentProfile.country}
            onChange={(e) => setCurrentProfile({ ...currentProfile, country: e.target.value })}
          />
        </FormControl>
        <FormControl id="County" isRequired>
          <FormLabel>County</FormLabel>
          <Input
            placeholder="County"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={currentProfile.county}
            onChange={(e) => setCurrentProfile({ ...currentProfile, county: e.target.value })}
          />
        </FormControl>
        <FormControl id="City" isRequired>
          <FormLabel>City</FormLabel>
          <Input
            placeholder="City"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={currentProfile.city}
            onChange={(e) => setCurrentProfile({ ...currentProfile, city: e.target.value })}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <PrimaryButton text="Submit" w="full" onClick={() => handleSubmitChanges()} />
          <SecondaryButton text="Cancel" w="full" />
        </Stack>
      </Stack>
    </Container>
  );
};

export default EditProfileForm;
