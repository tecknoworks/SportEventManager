import { Button } from '@chakra-ui/react';

type Props = {
  text: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

function PrimaryButton({ text, isDisabled, className, onClick, type }: Props) {
  return (
    <Button
      type={type}
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
