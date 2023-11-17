import {
  Card,
  CardBody,
  Image,
  Text,
  CardFooter,
  StackDivider,
  Stack,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import SecondaryButton from '../buttons/SecondaryButton';
import { EventDto } from 'features/browse-events/api/dtos';
import { format } from 'date-fns';
import { LatLng } from '../Map/models';
import Map from '../Map/Map';
import JoinButton from '../buttons/JoinButton';
import JoinModal from '../../../features/browse-events/components/events-page/events-card-list/join-modal/JoinModal';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from 'services/auth/context/AuthContext';

interface Props {
  event: EventDto;
  currentUser?: UserDetails;
}

const EventCard = ({ event, currentUser }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [isResizable] = useMediaQuery('(max-width: 1136px)');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const formattedStartDate = format(new Date(event.startDate), 'MM/dd/yyyy HH:mm');

  const handleEventUserClick = () => {
    navigate(`/event-users/${event.id}`);
  };

  return (
    <>
      <Card variant="elevated" w="100%">
        <CardBody
          display="flex"
          alignItems="center"
          flexDirection={!isResizable ? 'row' : 'column'}
          justifyContent="space-between"
        >
          <Stack width={!isResizable ? '40%' : '100%'} divider={<StackDivider />}>
            <Text as="b">{event.name}</Text>
            <Text>{formattedStartDate}</Text>
            <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth={!isMobile ? '200px' : '100%'}>
              {event.description}
            </Text>
            <Text>{event.locationName}</Text>
          </Stack>
          <Stack>
            <Image src={event.imageUrl} maxH={!isResizable ? '10rem' : '5rem'} />
          </Stack>
        </CardBody>
        <CardFooter
          display="flex"
          alignItems="center"
          flexDirection={!isMobile ? 'row' : 'column'}
          justifyContent={!isMobile ? '' : 'space-between'}
        >
          <SecondaryButton
            text="More details"
            w={!isMobile ? '' : '100%'}
            onClick={() => navigate(`/Event/GetEvent/${event.id}`)}
          />
          <JoinButton
            text="Join Event"
            isDisabled={event.isClosed || event.maximumParticipants === 0 ? true : false}
            w={!isMobile ? '' : '100%'}
            marginTop={!isMobile ? '' : '10px'}
            marginLeft={!isMobile ? '30px' : ''}
            onClick={onOpen}
          />
          {event.authorUserId === currentUser?.userId && (
            <SecondaryButton
              text="Event Users"
              w={!isMobile ? '' : '100%'}
              marginTop={!isMobile ? '' : '10px'}
              marginLeft={!isMobile ? '30px' : ''}
              onClick={handleEventUserClick}
            />
          )}
        </CardFooter>
      </Card>
      <JoinModal
        isOpen={isOpen}
        onClose={onClose}
        eventPositions={event.eventPositions}
        eventId={event.id}
        userId={currentUser?.userId}
      />
    </>
  );
};

export default EventCard;
