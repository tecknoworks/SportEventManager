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
import PrimaryButton from '../buttons/PrimaryButton';
import { closeEventThunk } from 'features/event/store/thunks/closeEventThunk';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CloseEventDto } from 'features/event/api/dtos';
import { useEffect, useState } from 'react';
import { selectCloseSuccess } from 'features/event/store/selectors/eventSelectors';
import { UserDetails } from 'services/auth/context/AuthContext';

interface Props {
  event: EventDto;
  currentUser?: UserDetails;
}

const EventCard = ({ event, currentUser }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isResizable] = useMediaQuery('(max-width: 1136px)');
  const formattedStartDate = format(new Date(event.startDate), 'MM/dd/yyyy HH:mm');
  const [reloadOnce, setReloadOnce] = useState(false);
  const isCloseSuccess = useSelector(selectCloseSuccess);

  const handleEventUserClick = () => {
    navigate(`/event-users/${event.id}`);
  };

  useEffect(() => {
    if (isCloseSuccess && !reloadOnce) {
      setReloadOnce(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isCloseSuccess, reloadOnce]);

  const handleCloseEvent = () => {
    const data: CloseEventDto = {
      eventId: event.id,
    };
    dispatch(closeEventThunk(data));
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
            <Text
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth={!isResizable ? '200px' : '100%'}
            >
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
          flexDirection={!isResizable ? 'row' : 'column'}
          justifyContent={!isResizable ? '' : 'space-between'}
        >
          <SecondaryButton
            text="More details"
            w={!isResizable ? '' : '100%'}
            onClick={() => navigate(`/event-details/${event.id}`)}
          />
          <JoinButton
            text="Join Event"
            isDisabled={event.isClosed || event.maximumParticipants === 0 ? true : false}
            w={!isResizable ? '' : '100%'}
            marginTop={!isResizable ? '' : '10px'}
            marginLeft={!isResizable ? '30px' : ''}
            onClick={onOpen}
          />
          {event.authorUserId === currentUser?.userId && event.isClosed === false && (
            <>
              <SecondaryButton
                text="Event Users"
                w={!isResizable ? '' : '100%'}
                marginTop={!isResizable ? '' : '10px'}
                marginLeft={!isResizable ? '30px' : ''}
                onClick={handleEventUserClick}
              />
              <SecondaryButton
                text="Close Event"
                w={!isResizable ? '' : '100%'}
                marginTop={!isResizable ? '' : '10px'}
                marginLeft={!isResizable ? '30px' : ''}
                onClick={handleCloseEvent}
              />
              <PrimaryButton
                text="Edit Event"
                w={!isResizable ? '' : '100%'}
                marginTop={!isResizable ? '' : '10px'}
                marginLeft={!isResizable ? '30px' : ''}
                onClick={() => navigate(`/edit-event/${event.id}`)}
              />
            </>
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
