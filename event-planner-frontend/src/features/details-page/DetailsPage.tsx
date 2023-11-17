import { Box, Flex, Heading, Text, VStack, HStack, Tag, Button, Container, Divider, Icon, Stack } from '@chakra-ui/react';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { selectEventDetails } from './store/selectors/detailsSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import Map from 'common/components/Map/Map';
import { LatLng } from 'common/components/Map/models';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { JoinEventDto } from 'features/browse-events/api/dtos';
import { joinEventThunk } from 'features/browse-events/thunks/joinEventsThunk';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { getColorScheme, getSkillLevelText } from 'common/helpers/skillLevelHelpers';
import { MdEvent, MdEventAvailable, MdLocationOn } from 'react-icons/md';

const DetailsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector(selectEventDetails);
  const { eventId } = useParams();
  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');

  useEffect(() => {
    dispatch(getEventThunk(`${eventId}`));
  }, []);

  const {
    authorUserId,
    authorUserName,
    description,
    endDate,
    eventPositions,
    hasPositions,
    id,
    isClosed,
    location,
    locationName,
    maximumParticipants,
    name,
    participants,
    skillLevel,
    sportTypeId,
    sportTypeName,
    startDate,
  } = details;

  const handleJoinEvent = async (positionId: any) => {
    const data: JoinEventDto = {
      userId: user?.userId,
      eventId: eventId || '',
      eventPositionId: positionId,
    };
    await dispatch(joinEventThunk(data));
    await dispatch(getEventThunk(`${eventId}`));
  };

  const [latString, lngString] = location ? location.split(',') : [null, null];
  const lat = latString ? parseFloat(latString) : 0;
  const lng = lngString ? parseFloat(lngString) : 0;
  const center: LatLng = {
    lat: lat,
    lng: lng,
  };
  const allParticipantsZero = participants && participants.every(participant => participant.status === 0);

  const parsedDateStart = startDate ? parseISO(startDate) : null;
  const formattedDateStart = parsedDateStart ? format(parsedDateStart, 'HH:mm dd-MM-yyyy') : '';

  const parsedDateEnd = endDate ? parseISO(endDate) : null;
  const formattedDateEnd = parsedDateEnd ? format(parsedDateEnd, 'HH:mm dd-MM-yyyy') : '';
  { }

  return (
    <Container maxW="container.md" bg="white" p={4} borderRadius="lg" boxShadow="md" mt={'9'}>
      <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justifyContent="space-between">
        <VStack spacing={4} align="stretch" flex="1" minW={{ base: '100%', md: '65%' }}>
          <Heading as="h1" size="xl" color="purple.700">
            {name}
          </Heading>
          <Heading
            as="h3"
            size="md"
            color="purple.300"
            onClick={() => {
              navigate(`/profile/${authorUserId}`);
            }}
            cursor="pointer"
          >
            Organizer : {authorUserName}
          </Heading>
          <Text fontSize="md">{description}</Text>
          <Text fontSize="md">{sportTypeName}</Text>

          <Text display="flex" alignItems="center">
            <Icon as={MdLocationOn} mr={2} />
            <Text fontSize="md">Location: {locationName}</Text>
          </Text>

          <Stack align="baseline" mt={2}>
            <HStack>
              <Icon as={MdEvent} mr={2} />
              <Text fontSize="md">Starts: {formattedDateStart}</Text>
            </HStack>
            <HStack>
              <Icon as={MdEventAvailable} mr={2} />
              <Text fontSize="md">Ends: {formattedDateEnd}</Text>
            </HStack>
          </Stack>
          <HStack>
            <Text fontSize="md">Skill Level:</Text>
            <Tag size="sm" variant="solid" colorScheme={getColorScheme(skillLevel)}>
              {getSkillLevelText(skillLevel)}
            </Tag>
          </HStack>
          <Box mx={'3'}>
            <Map isResizable={true} center={center} />
          </Box>

          <Divider />
          {hasPositions === false && (maximumParticipants ?? 0) > 0 ? (
            <PrimaryButton text="Join Event" onClick={() => handleJoinEvent(null)} />
          ) : (
            <VStack spacing={2} align="stretch">
              {hasPositions === true && (
                <Heading as="h3" size="md" color="purple.500">
                  Positions
                </Heading>
              )}
              <Box>
                {eventPositions &&
                  eventPositions.map((position, index) => (
                    <HStack key={index} justifyContent="space-between" mt={'2'}>
                      <Text fontSize="md">
                        {position.positionName} : {position.availablePositions}
                      </Text>
                      {(position.availablePositions ?? 0) > 0 && (
                        <PrimaryButton
                          text="Join Event on this position"
                          onClick={() => handleJoinEvent(position.positionId)}
                        />
                      )}
                    </HStack>
                  ))}
              </Box>
            </VStack>
          )}
          <Divider />
          <VStack spacing={2} align="stretch">
            <Heading as="h3" size="md" color="purple.500">
              Participants
            </Heading>
            <Box>
              {allParticipantsZero && <Text fontSize="md">No user joined yet. Be the first one!</Text>}
              {participants && participants.length === 0 && (
                <Text fontSize="md">0 participant now</Text>
              )}
              {participants &&
                participants.map((participant, index) => (
                  participant.status === 1 && (
                    <HStack key={index} justifyContent="space-between">
                      {!hasPositions ? (
                        <Text fontSize="md">{participant.userName || 'Anonymous'}</Text>
                      ) : (
                        <>
                          <Text fontSize="md">{participant.positionName}:</Text>
                          <Text fontSize="md">{participant.userName || 'Anonymous'}</Text>
                        </>
                      )}
                    </HStack>
                  )
                ))}
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default DetailsPage;