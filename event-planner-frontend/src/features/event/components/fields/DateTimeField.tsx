import React, { ChangeEvent } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface DateTimeFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({ label, value, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input type="datetime-local" value={value} onChange={onChange} />
    </FormControl>
  );
};

export default DateTimeField;
