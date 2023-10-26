import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  text: string;
  isDisabled: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

function PrimaryButton({ text, isDisabled, className, type }: Props) {
  return (
    <Button
      type={type}
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
