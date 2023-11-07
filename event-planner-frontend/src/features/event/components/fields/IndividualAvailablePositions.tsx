import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { EventPosition } from 'features/event/api/models';

interface IndividualAvailablePositionsProps {
  selectedPositions: EventPosition[];
  handleAvailablePositionsChange: (positionId: string, value: string) => any;
  handleDeletePosition: (positionId: string) => any;
}

const IndividualAvailablePositions: React.FC<IndividualAvailablePositionsProps> = ({
  selectedPositions,
  handleAvailablePositionsChange,
  handleDeletePosition,
}) => {
  return (
    <>
      {selectedPositions.map((position) => (
        <Box
          key={position.positionId}
          display="flex"
          justifyContent="center"
          alignItems="end"
          gap="1rem"
          paddingTop="0.5rem"
        >
          <FormControl id={`${position.positionId}`} isRequired>
            <FormLabel>{position.positionName}</FormLabel>
            <Input
              min={0}
              type="number"
              value={position.availablePositions}
              onChange={(event) => handleAvailablePositionsChange(position.positionId, event.target.value)}
            />
          </FormControl>
          <Button colorScheme="red" onClick={() => handleDeletePosition(position.positionId)}>
            <DeleteIcon />
          </Button>
        </Box>
      ))}
    </>
  );
};

export default IndividualAvailablePositions;
