import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

type Props = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggleShow: () => void;
  placeholder: string;
  errorMessage: string;
  isRequired: boolean;
};

function PasswordInput({ value, onChange, show, onToggleShow, placeholder, errorMessage, isRequired }: Props) {
  return (
    <FormControl isRequired={isRequired} isInvalid={errorMessage.length > 0}>
      <FormLabel>{placeholder}</FormLabel>
      <InputGroup size="md">
        <Input
          value={value}
          pr="75px"
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={onChange}
        />
        <InputRightElement width="75px">
          <Button h="28px" size="sm" onClick={onToggleShow}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

export default PasswordInput;
