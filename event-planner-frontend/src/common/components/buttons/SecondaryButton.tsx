import { Button } from '@chakra-ui/react';

type Props = {
  text: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button' | undefined;
  w?: string;
};

function SecondaryButton({ text, isDisabled, className, onClick, type, w }: Props) {
  return (
    <Button
      type={type}
      className={className}
      isDisabled={isDisabled}
      colorScheme="purple"
      size="md"
      variant="outline"
      onClick={onClick}
      w={w}
    >
      {text}
    </Button>
  );
}

export default SecondaryButton;
