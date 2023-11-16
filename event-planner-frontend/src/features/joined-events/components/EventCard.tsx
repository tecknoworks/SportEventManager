import { Box, Text, Divider, Stack, Badge, Icon } from '@chakra-ui/react';
import { SportEvent } from '../api/dtos';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdEvent, MdEventAvailable, MdPersonOutline, MdPeopleOutline } from 'react-icons/md';

const EventCard: React.FC<{ event: SportEvent }> = ({ event }) => {
  const navigate = useNavigate();
  console.log(event);


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
      <Text fontSize="xl" as="b" onClick={() => navigate(`/Event/GetEvent/${event.id}`)} cursor="pointer">
        {event.name}{' '}
      </Text>
      <Badge borderRadius="full" px="2" colorScheme={event.isClosed ? 'red' : 'green'}>
        {event.isClosed ? 'Closed' : 'Open'}
      </Badge>
      <Text mt={2}>{event.description}</Text>
      <Divider my={2} />
      <Text display="flex" alignItems="center">
        <Icon as={MdLocationOn} mr={2} />
        Location: {event.locationName}
      </Text>

      <Stack direction="row" align="baseline" mt={2}>
        <Icon as={MdEvent} mr={2} />
        <Text fontSize="sm">Starts: {formattedDateStart}</Text>
        <Icon as={MdEventAvailable} mr={2} ml={4} />
        <Text fontSize="sm">Ends: {formattedDateEnd}</Text>
      </Stack>

      <Text mt={4} display="flex" alignItems="center">
        <Icon as={MdPersonOutline} mr={2} />
        Author: {event.authorUserName ? event.authorUserName : 'Not specified'}
      </Text>
      <Text mt={2} display="flex" alignItems="center">
        <Icon as={MdPeopleOutline} mr={2} />
        Participants: {event.participants ? event.participants.length : 'Not specified'}
      </Text>
    </Box>
  );
};

export default EventCard;
