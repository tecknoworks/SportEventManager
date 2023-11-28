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
  Icon,
  Box,
} from '@chakra-ui/react';
import SecondaryButton from '../buttons/SecondaryButton';
import { EventDto } from 'features/browse-events/api/dtos';
import { format } from 'date-fns';
import JoinButton from '../buttons/JoinButton';
import JoinModal from '../../../features/browse-events/components/events-page/events-card-list/join-modal/JoinModal';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/PrimaryButton';
import { closeEventThunk } from 'features/event/store/thunks/closeEventThunk';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CloseEventDto } from 'features/event/api/dtos';
import { UserDetails, getUserFromToken } from 'services/auth/context/AuthContext';
import { MdEvent, MdLocationOn, MdOutlineDescription } from 'react-icons/md';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import DeleteButton from '../buttons/DeleteButton';
import ConfirmationModal from 'features/admin-management/components/Moldal/ConfirmationModal';
import { useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'closeEvent' | null>(null);

  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');

  const isUserParticipant = event.participants?.find((participant) => participant.userId === user?.userId);

  const handleEventUserClick = () => {
    navigate(`/event-users/${event.id}`);
  };

  const openCloseEvent = () => {
    setConfirmAction('closeEvent');
    setIsModalOpen(true);
  };

  const handleCloseEvent = () => {
    setIsModalOpen(false);
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
            <Box display="flex" alignItems="center">
              <Icon as={MdEvent} mr={2} />
              <Text>{formattedStartDate}</Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Icon as={MdOutlineDescription} mr={2} />
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth={!isResizable ? '200px' : '100%'}
              >
                {event.description}
              </Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Icon as={MdLocationOn} mr={2} />
              <Text> {event.locationName}</Text>
            </Box>
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
          {token && (
            <JoinButton
              text="Join Event"
              isDisabled={event.isClosed || event.maximumParticipants === 0 || !!isUserParticipant ? true : false}
              w={!isResizable ? '' : '100%'}
              marginTop={!isResizable ? '' : '10px'}
              marginLeft={!isResizable ? '30px' : ''}
              onClick={onOpen}
            />
          )}
          {event.authorUserId === currentUser?.userId && event.isClosed === false && (
            <>
              <SecondaryButton
                text="Event Users"
                w={!isResizable ? '' : '100%'}
                marginTop={!isResizable ? '' : '10px'}
                marginLeft={!isResizable ? '30px' : ''}
                onClick={handleEventUserClick}
              />
              <PrimaryButton
                text="Edit Event"
                w={!isResizable ? '' : '100%'}
                marginTop={!isResizable ? '' : '10px'}
                marginLeft={!isResizable ? '30px' : ''}
                onClick={() => navigate(`/edit-event/${event.id}`)}
              />
              <DeleteButton
                text="Close Event"
                w={!isResizable ? '' : '100%'}
                marginTop={!isResizable ? '' : '10px'}
                marginLeft={!isResizable ? '30px' : ''}
                onClick={openCloseEvent}
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
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        confirmAction={confirmAction}
        handleConfirm={handleCloseEvent}
      />
    </>
  );
};

export default EventCard;
