import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  text: string;
  isDisabled: boolean;
  className?: string;
};

function PrimaryButton({ text, isDisabled, className }: Props) {
  return (
    <Button
      className={className}
      isDisabled={isDisabled}
      colorScheme="purple"
      size="md"
      variant="solid"
    >
      {text}
    </Button>
  );
}

export default PrimaryButton;
