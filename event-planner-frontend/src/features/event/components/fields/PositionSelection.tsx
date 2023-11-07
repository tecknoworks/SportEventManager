import React, { ChangeEvent } from 'react';
import { Box, FormLabel, Select } from '@chakra-ui/react';
import { GetPositionForSportTypeDto } from 'features/event/api/dtos';
import { EventPosition } from 'features/event/api/models';
import IndividualAvailablePositions from './IndividualAvailablePositions';

interface PositionSelectionProps {
  positionsForSportType: GetPositionForSportTypeDto[];
  handlePositionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedPositions: EventPosition[];
  handleAvailablePositionsChange: (positionId: string, value: string) => void;
  handleDeletePosition: (positionId: string) => void;
}

const PositionSelection: React.FC<PositionSelectionProps> = ({
  positionsForSportType,
  handlePositionChange,
  selectedPositions,
  handleAvailablePositionsChange,
  handleDeletePosition,
}) => {
  return (
    <Box w="full">
      <FormLabel>Select Positions</FormLabel>
      <Select placeholder="Select Position" onChange={handlePositionChange}>
        {positionsForSportType.map((position) => (
          <option key={position.id} value={position.id}>
            {position.name}
          </option>
        ))}
      </Select>
      <IndividualAvailablePositions
        selectedPositions={selectedPositions}
        handleAvailablePositionsChange={handleAvailablePositionsChange}
        handleDeletePosition={handleDeletePosition}
      />
    </Box>
  );
};

export default PositionSelection;
