import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  text: string;
  isDisabled: boolean;
  className?: string;
  onClick: any;
};

function PrimaryButton({ text, isDisabled, className, onClick }: Props) {
  return (
    <Button
      className={className}
      isDisabled={isDisabled}
      colorScheme="purple"
      size="md"
      variant="solid"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default PrimaryButton;
