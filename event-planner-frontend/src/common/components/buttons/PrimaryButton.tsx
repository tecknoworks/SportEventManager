import { Button } from '@chakra-ui/react';

type Props = {
  text: any;
  isDisabled?: boolean;
  className?: string;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button' | undefined;
  w?: string;
};

function PrimaryButton({ text, isDisabled, className, onClick, type, w }: Props) {
  return (
    <Button
      type={type}
      className={className}
      isDisabled={isDisabled}
      colorScheme="purple"
      size="md"
      variant="solid"
      onClick={onClick}
      w={w}
    >
      {text}
    </Button>
  );
}

export default PrimaryButton;
