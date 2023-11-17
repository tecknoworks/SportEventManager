import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { Navigate } from 'react-router-dom';
import RatingComponent from './views/RatingComponent';
import { AppDispatch } from 'redux/store';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { selectCurrentEvent } from 'features/event/store/selectors/eventSelectors';
import { Box, Divider, Flex, Input, Text } from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';

const useURLParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user = decodeURIComponent(params.get('user') || '');
  const event = decodeURIComponent(params.get('event') || '');

  return { user, event };
};

export function AccessToReviewPage({ children, userFromLink }: any) {
  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');
  const isAccepted = userFromLink === user?.userId;

  return <>{isAccepted ? children : <Navigate to="/" replace />}</>;
}

const ReviewEventPage = () => {
  const { user, event } = useURLParams();
  const userId: string = user;
  const eventId: string = event;
  const dispatch: AppDispatch = useDispatch();
  const currentEvent = useSelector(selectCurrentEvent);
  const [participantData, setParticipantData] = useState<{ [key: string]: { rating: number; comment: string } }>({});

  useEffect(() => {
    dispatch(getEventThunk(eventId));
  }, []);

  const handleRatingChange = (participantId: string, rating: number) => {
    setParticipantData((prevData) => ({
      ...prevData,
      [participantId]: {
        ...prevData[participantId],
        rating,
      },
    }));
  };

  const handleCommentChange = (participantId: string, comment: string) => {
    setParticipantData((prevData) => ({
      ...prevData,
      [participantId]: {
        ...prevData[participantId],
        comment,
      },
    }));
  };

  const filteredParticipants = currentEvent?.participants?.filter((participant) => participant.status === 1) || [];

  const handleSubmitReviews = () => {
    console.log(participantData);
  };

  return (
    <AccessToReviewPage userFromLink={userId}>
      <Text color="white" fontSize="24px" textAlign="center" marginTop="50px">
        Review the participants of {currentEvent?.name} event
      </Text>
      <Flex
        backgroundColor="whiteAlpha.500"
        padding="20px"
        w="auto"
        margin="50px"
        flexDir="column"
        alignItems="center"
        borderRadius="20px"
      >
        {filteredParticipants.map((participant, index) => (
          <React.Fragment key={participant.userId}>
            <Flex flexDir="column" alignItems="center" w="auto" marginTop="10px" gap="10px">
              <Text>{participant.userName}</Text>
              <RatingComponent
                count={5}
                value={participantData[participant.userId]?.rating || 0}
                edit={true}
                onChange={(value) => handleRatingChange(participant.userId, value)}
              />
            </Flex>
            <Input
              marginTop="10px"
              placeholder="Write a comment for this user"
              value={participantData[participant.userId]?.comment || ''}
              onChange={(e) => handleCommentChange(participant.userId, e.target.value)}
            />
            {index !== filteredParticipants.length - 1 && <Divider marginTop="20px" />}
          </React.Fragment>
        ))}
        <PrimaryButton marginTop="30px" text="Submit reviews" onClick={handleSubmitReviews} />
      </Flex>
    </AccessToReviewPage>
  );
};

export default ReviewEventPage;
