import React, { ChangeEvent } from 'react';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';

interface EventDescriptionFieldProps {
  eventDescription: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const EventDescriptionField: React.FC<EventDescriptionFieldProps> = ({ eventDescription, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>Event Description</FormLabel>
      <Textarea
        placeholder="Write a meaningful description for your event."
        rows={3}
        value={eventDescription}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default EventDescriptionField;
