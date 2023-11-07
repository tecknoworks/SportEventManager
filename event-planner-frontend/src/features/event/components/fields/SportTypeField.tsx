import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { GetSportTypesDto } from 'features/event/api/dtos';

interface SportTypeFieldProps {
  sportTypes: GetSportTypesDto[];
  handleSportChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SportTypeField: React.FC<SportTypeFieldProps> = ({ sportTypes, handleSportChange }) => {
  return (
    <FormControl id="sportType" isRequired>
      <FormLabel>Sport Type</FormLabel>
      <Select placeholder="Select Sport" onChange={handleSportChange}>
        {sportTypes.map((sportType) => (
          <option key={sportType.id} value={sportType.id}>
            {sportType.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SportTypeField;
