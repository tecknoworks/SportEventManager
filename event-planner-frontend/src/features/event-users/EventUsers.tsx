import { Box, Text } from '@chakra-ui/react';
import Board from 'common/components/board/Board';
import UserCardDnd from 'common/components/card/UserCardDnd';
import { selectCurrentEvent } from 'features/event/store/selectors/eventSelectors';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from 'redux/store';

const EventUsers = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch: AppDispatch = useDispatch();
  const event = useSelector(selectCurrentEvent);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      dispatch(getEventThunk(eventId));
    }
    console.log(event);
  }, [eventId, dispatch]);

  return (
    <Box w="100%" h="100%">
      <Text
        marginTop="20px"
        fontWeight="semibold"
        textAlign="center"
        backgroundColor="whiteAlpha.500"
        w="auto"
        borderRadius="10px"
      >
        {event?.name}
      </Text>
      <Box w="100%" h="100%" display="flex" justifyContent="space-between" padding="20px 10px 0 10px">
        {event?.participants &&
          event.participants.map((participant) => (
            <>
              <Board id="board-1" boardTitle="Pending Users">
                <UserCardDnd id={participant.userId}>
                  <Text
                    color="purple.300"
                    onClick={() => {
                      navigate(`/profile/${participant.userId}`);
                    }}
                    cursor="pointer"
                    border="1px solid red"
                    w="fit-content"
                  >
                    {participant.userName}
                  </Text>
                </UserCardDnd>
              </Board>
              <Board id="board-2" boardTitle="Joined Users">
                <UserCardDnd id="card-4">Card Four</UserCardDnd>
              </Board>
            </>
          ))}
      </Box>
    </Box>
  );
};

export default EventUsers;
