import { Button } from '@chakra-ui/react';

type Props = {
  text: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button' | undefined;
  w?: string;
  marginLeft?: string;
  marginTop?: string;
};

function JoinButton({ text, isDisabled, className, onClick, type, w, marginLeft, marginTop, ...rest }: Props) {
  return (
    <Button
      type={type}
      className={className}
      isDisabled={isDisabled}
      color="green.400"
      borderColor="green.500"
      size="md"
      variant="outline"
      onClick={onClick}
      w={w}
      style={{ marginLeft, marginTop }}
      {...rest}
    >
      {text}
    </Button>
  );
}

export default JoinButton;
