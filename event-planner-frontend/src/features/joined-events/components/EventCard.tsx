import { Box, Text, Divider, Stack, Badge, Icon } from '@chakra-ui/react';
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

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      bg="white"
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{ transform: 'scale(1.03)' }}
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
          Location: {event.locationName}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" padding="0.5rem">
        <Icon as={MdEvent} mr={2} />
        <Text>Starts: {formattedDateStart}</Text>
      </Box>
      <Box display="flex" alignItems="center" padding="0.5rem">
        <Icon as={MdEventAvailable} mr={2} />
        <Text>Ends: {formattedDateEnd}</Text>
      </Box>
      <Divider my={2} />
      <Text
        mt={4}
        display="flex"
        alignItems="center"
        onClick={() => navigate(`/profile/${event.authorUserId}`)}
        cursor="pointer"
      >
        <Icon as={MdPersonOutline} mr={2} />
        Author: {event.authorUserName ? event.authorUserName : 'Not specified'}
      </Text>
      <Text mt={2} display="flex" alignItems="center">
        <Icon as={MdPeopleOutline} mr={2} />
        Participants:{' '}
        {event.participants && event.participants.length > 0 ? (
          event.participants
            .filter((participant: Participant) => participant.status !== 0)
            .map((participant: Participant, index: any) => (
              <span key={participant.userId}>
                <Text as="span" onClick={() => navigate(`/profile/${participant.userId}`)} cursor="pointer">
                  {participant.userName || 'Anonymous'}
                </Text>
                {index < event.participants.length - 1 && <span>, &nbsp; </span>}
              </span>
            ))
        ) : (
          <Text>No participants</Text>
        )}
      </Text>
    </Box>
  );
};

export default EventCard;
