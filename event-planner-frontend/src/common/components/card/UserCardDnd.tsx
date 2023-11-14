import { Card, CardBody } from '@chakra-ui/react';
import React, { useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';

interface Props {
  children: React.ReactNode;
  id: string;
}

const UserCardDnd = ({ children, id }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = (e: any) => {
    setIsDragging(true);
    e.dataTransfer.setData('cardId', id);
  };

  const dragEnd = () => {
    setIsDragging(false);
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
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default UserCardDnd;
