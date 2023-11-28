import { Box, Text, Divider, Stack, Badge, Icon, useColorMode } from '@chakra-ui/react';
import { SportEvent } from '../api/dtos';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdEvent, MdEventAvailable, MdPersonOutline, MdPeopleOutline } from 'react-icons/md';

type Participant = {
  userId: string;
  userName: string | null;
  eventPositionId: string | null;
  positionName: string | null;
  status: number;
  statusName: string;
};

const EventCard: React.FC<{ event: SportEvent }> = ({ event }) => {
  const navigate = useNavigate();

  const parsedDateStart = event.startDate ? parseISO(event.startDate) : null;
  const formattedDateStart = parsedDateStart ? format(parsedDateStart, 'HH:mm dd-MM-yyyy') : '';

  const parsedDateEnd = event.endDate ? parseISO(event.endDate) : null;
  const formattedDateEnd = parsedDateEnd ? format(parsedDateEnd, 'HH:mm dd-MM-yyyy') : '';

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{ transform: 'scale(1.03)' }}
      bg={bgColor}
    >
      <Box display="flex" alignItems="center" gap="0.5rem">
        <Text fontSize="xl" as="b" onClick={() => navigate(`/event-details/${event.id}`)} cursor="pointer">
          {event.name}{' '}
        </Text>
        <Badge borderRadius="full" px="2" colorScheme={event.isClosed ? 'red' : 'green'}>
          {event.isClosed ? 'Closed' : 'Open'}
        </Badge>
      </Box>
      <Text mt={2}>{event.description}</Text>

      <Divider my={2} />
      <Box display="flex" alignItems="center" padding="0.5rem">
        <Icon as={MdLocationOn} mr={2} />
        <Text display="flex" alignItems="center">
          <strong>Location:&nbsp;</strong> {event.locationName}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" padding="0.5rem">
        <Icon as={MdEvent} mr={2} />
        <Text>
          <strong>Starts: </strong> {formattedDateStart}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" padding="0.5rem">
        <Icon as={MdEventAvailable} mr={2} />
        <Text><strong>Ends: </strong>{formattedDateEnd}</Text>
      </Box>

      <Divider my={2} />
      <Text
        mt={4}
        display="flex"
        alignItems="center"
        padding="0.5rem"
      >
        <Icon as={MdPersonOutline} mr={2} />
        <strong>Author:&nbsp;</strong>
        <Badge mr={2} px={2} py={1} borderRadius="full" cursor="pointer" colorScheme="purple" onClick={() => navigate(`/profile/${event.authorUserId}`)}>
          {event.authorUserName ? event.authorUserName : 'Not specified'}
        </Badge>
      </Text>
      <Text display="flex" alignItems="center" padding="0.5rem">
        <Icon as={MdPeopleOutline} mr={2} />
        <strong>Participants:</strong>&nbsp;
        {event.participants && event.participants.length > 0 ? (
          event.participants
            .filter((participant: Participant) => participant.status !== 0)
            .map((participant: Participant, index: any) => (
              <Badge key={participant.userId} mr={2} px={2} py={1} borderRadius="full" cursor="pointer" colorScheme="blue" onClick={() => navigate(`/profile/${participant.userId}`)}>
                {participant.userName || 'Anonymous'}
              </Badge>
            ))
        ) : (
          <Text>No participants</Text>
        )}
      </Text>
    </Box>
  );
};

export default EventCard;
