import { Button } from '@chakra-ui/react';

type Props = {
  text: any;
  isDisabled?: boolean;
  className?: string;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button' | undefined;
  w?: string;
  marginTop?: string;
  marginLeft?: string;
};

function PrimaryButton({ text, isDisabled, className, onClick, type, w, marginTop, marginLeft }: Props) {
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
      marginTop={marginTop}
      marginLeft={marginLeft}
    >
      {text}
    </Button>
  );
}

export default PrimaryButton;
