import { Box, Text } from '@chakra-ui/react';
import Board from 'common/components/board/Board';
import UserCardDnd from 'common/components/card/UserCardDnd';
import { selectCurrentEvent } from 'features/event/store/selectors/eventSelectors';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from 'redux/store';
import { ParticipantStatus } from './api/dtos';

const EventUsers = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch: AppDispatch = useDispatch();
  const event = useSelector(selectCurrentEvent);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      dispatch(getEventThunk(eventId));
    }
  }, [eventId, dispatch]);

  const pendingParticipants =
    event?.participants?.filter((participant) => participant.status === ParticipantStatus.Pending) || [];
  const joinedParticipants =
    event?.participants?.filter((participant) => participant.status === ParticipantStatus.Accepted) || [];

  return (
    <Box w="100%" h="100%">
      <Text w="100%" textAlign="center" fontSize="20px" backgroundColor={'whiteAlpha.500'} marginTop="10px">
        {event?.name}
      </Text>
      <Box w="100%" h="100%" display="flex" justifyContent="space-between" padding="20px 10px 0 10px">
        <Board id="board-1" boardTitle="Pending Users" eventId={event?.id}>
          {pendingParticipants.map((participant) => (
            <UserCardDnd key={participant.userId} id={participant.userId} eventId={event?.id}>
              <Text
                color="purple.300"
                onClick={() => {
                  navigate(`/profile/${participant.userId}`);
                }}
                cursor="pointer"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                w="100%"
                maxW="150px"
                p="2"
              >
                {participant.userName}
              </Text>
            </UserCardDnd>
          ))}
        </Board>
        <Board id="board-2" boardTitle="Joined Users" eventId={event?.id}>
          {joinedParticipants.map((participant) => (
            <UserCardDnd key={participant.userId} id={participant.userId} eventId={event?.id}>
              <Text
                color="purple.300"
                onClick={() => {
                  navigate(`/profile/${participant.userId}`);
                }}
                cursor="pointer"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                w="100%"
                maxW="150px"
                p="2"
              >
                {participant.userName}
              </Text>
            </UserCardDnd>
          ))}
        </Board>
      </Box>
    </Box>
  );
};

export default EventUsers;
