import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  id: string;
  boardTitle: string;
}

const Board = ({ children, id, boardTitle }: Props) => {
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData('cardId');
    const draggedCard = document.getElementById(cardId);
    const targetElement = e.target as Element;
    const targetBoard = targetElement.closest('.board');

    if (targetBoard instanceof HTMLElement && targetBoard.classList.contains('drop-target') && draggedCard) {
      targetBoard.appendChild(draggedCard);
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <Box
      id={id}
      onDrop={drop}
      onDragOver={dragOver}
      width="100%"
      maxWidth="300px"
      backgroundColor="whiteAlpha.600"
      overflow="auto"
      margin="0 auto"
      padding="10px"
      borderRadius="10px"
      border="1px solid purple"
      className="board drop-target"
    >
      <Text textAlign="center" fontWeight="semibold" color={boardTitle === 'Joined Users' ? 'green.500' : 'gray.600'}>
        {boardTitle}
      </Text>
      {children}
    </Box>
  );
};

export default Board;
