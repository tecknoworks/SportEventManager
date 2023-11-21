import {
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Text,
  Box,
  useMediaQuery,
} from '@chakra-ui/react';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../store/thunks/getProfileThunk';
import { useEffect } from 'react';
import { selectProfile, selectUserRating } from '../store/selectors/profileSelector';
import { formatDate } from 'common/helpers/dateFormatter';
import { getAverageRatingThunk } from '../store/thunks/getAverageRatingThunk';
import { EmptyStar, FullStar } from 'features/review-event/views/RatingComponent';

type Props = {
  userId?: string;
};

const SeeProfile = ({ userId }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const rating = useSelector(selectUserRating);
  const [isMobile] = useMediaQuery('(max-width: 1037px)');

  useEffect(() => {
    dispatch(getProfileThunk(userId || ''));
    dispatch(getAverageRatingThunk(userId || ''));
  }, []);

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
      <Stack
        spacing={6}
        p={6}
        w={!isMobile ? '50vw' : '90%'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        my={12}
        margin="0"
        alignItems="center"
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile
        </Heading>
        <Stack
          flexDirection={!isMobile ? 'row' : 'column'}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          gap={!isMobile ? '45px' : '0px'}
        >
          <Stack spacing={4}>
            <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar
                    name={profile?.firstName + ' ' + profile?.lastName}
                    size="xl"
                    src={profile?.profilePhoto}
                    bgColor="#610c9f"
                  ></Avatar>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Text>{profile?.firstName}</Text>
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Text>{profile?.lastName}</Text>
            </FormControl>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number</FormLabel>
              <Text>{profile?.phoneNumber}</Text>
            </FormControl>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="DateOfBirth">
              <FormLabel>Date of Birth</FormLabel>
              <Text>{profile?.dateOfBirth ? formatDate(profile?.dateOfBirth) : 'Date not provided'}</Text>
            </FormControl>
            <FormControl id="Country">
              <FormLabel>Country</FormLabel>
              <Text>{profile?.country}</Text>
            </FormControl>
            <FormControl id="County">
              <FormLabel>County</FormLabel>
              <Text>{profile?.county}</Text>
            </FormControl>
            <FormControl id="City">
              <FormLabel>City</FormLabel>
              <Text>{profile?.city}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>{profile?.firstName} Rating</FormLabel>
              <Box display="flex" alignItems="center">
                <Text> {rating === 0 ? `No rating yet` : Number(rating).toFixed(1)} </Text>
                {rating === 0 ? <EmptyStar /> : <FullStar color="#ffd700" />}
              </Box>
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SeeProfile;
