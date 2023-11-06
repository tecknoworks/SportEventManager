import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface EventNameFieldProps {
  eventName: string;
  onChange: (e: any) => void;
}

const EventNameField: React.FC<EventNameFieldProps> = ({ eventName, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>Event Name</FormLabel>
      <Input type="text" placeholder="Give a meaningful name to your event." value={eventName} onChange={onChange} />
    </FormControl>
  );
};

export default EventNameField;
