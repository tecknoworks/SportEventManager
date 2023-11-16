import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { Navigate } from 'react-router-dom';

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

  return <AccessToReviewPage userFromLink={userId}>Review Page</AccessToReviewPage>;
};

export default ReviewEventPage;
