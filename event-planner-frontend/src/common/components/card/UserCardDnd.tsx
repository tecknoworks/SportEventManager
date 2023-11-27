import { DeleteIcon } from '@chakra-ui/icons';
import { Card, CardBody, useMediaQuery } from '@chakra-ui/react';
import { deleteParticipanttIsSuccess } from 'features/browse-events/store/selectors/eventsPageSelector';
import { DeleteParticipantDto } from 'features/event-users/api/dtos';
import { deleteParticipantThunk } from 'features/event-users/thunks/deleteParticipantThunk';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

interface Props {
  children: React.ReactNode;
  id: string;
  eventId: string | undefined;
}

const UserCardDnd = ({ children, id, eventId }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 417px)');
  const isDeleteSuccess = useSelector(deleteParticipanttIsSuccess);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isDeleteSuccess) {
      if (eventId) {
        dispatch(getEventThunk(eventId));
      }
    }
  }, [isDeleteSuccess]);

  const dragStart = (e: any) => {
    setIsDragging(true);
    e.dataTransfer.setData('cardId', id);
  };

  const dragEnd = () => {
    setIsDragging(false);
  };

  const handleDeleteUser = async () => {
    const data: DeleteParticipantDto = {
      userId: id,
      eventId: eventId,
    };
    await dispatch(deleteParticipantThunk(data));
  };

  return (
    <Card
      id={id}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      draggable="true"
      marginTop="10px"
      opacity={isDragging ? 0.5 : 1}
      className="user-card"
      display="flex"
      flexDirection={!isMobile ? 'row' : 'column'}
      alignItems="center"
      justifyContent="center"
      padding="5px"
    >
      <CardBody>{children}</CardBody>
      <DeleteIcon width="50px" cursor="pointer" onClick={handleDeleteUser} />
    </Card>
  );
};

export default UserCardDnd;
