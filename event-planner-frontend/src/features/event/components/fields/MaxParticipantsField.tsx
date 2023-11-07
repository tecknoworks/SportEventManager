import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface MaxParticipantsFieldProps {
  maximumParticipants: number;
  onChange: (e: any) => void;
}

const MaxParticipantsField: React.FC<MaxParticipantsFieldProps> = ({ maximumParticipants, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>Maximum number of participants</FormLabel>
      <Input
        type="number"
        placeholder="Insert the maximum number of participants"
        value={maximumParticipants}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default MaxParticipantsField;
