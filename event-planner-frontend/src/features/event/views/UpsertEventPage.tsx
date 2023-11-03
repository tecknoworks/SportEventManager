import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import Loader from 'common/components/Loader/Loader';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import SecondaryButton from 'common/components/buttons/SecondaryButton';
import { formatDate } from 'common/helpers/dateFormatter';
import { profile } from 'console';
import React from 'react';

function UpsertEventPage() {
  const [isMobile] = useMediaQuery('(max-width: 1037px)');
  const [selectedSport, setSelectedSport] = React.useState<SportType | ''>('');
  const [selectedPositions, setSelectedPositions] = React.useState<Positions>({});

  const handlePositionChange = (event: any, position: any) => {
    setSelectedPositions((prev) => ({
      ...prev,
      [position]: event.target.value,
    }));
  };

  const handleSportChange = (event: any) => {
    const sportId = event.target.value;
    setSelectedSport(sportId);
    setSelectedPositions({}); // Clear previously selected positions
  };

  type SportType = 'sport1id' | 'sport2id' | 'sport3id';
  type Positions = { [key: string]: string };

  const sportPositions: Record<SportType, string[]> = {
    sport1id: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    sport2id: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    sport3id: [], // Assuming Hiking has no specific positions
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      height={!isMobile ? '100vh' : 'auto'}
      alignItems="center"
      bgGradient="linear(to-r, #610C9F, #E95793)"
    >
      <FormControl id="sportType" isRequired>
        <FormLabel>Sport Type</FormLabel>
        <Select placeholder="Select Sport" onChange={handleSportChange}>
          <option value="sport1id">Football</option>
          <option value="sport2id">Basketball</option>
          <option value="sport3id">Hiking</option>
        </Select>
      </FormControl>

      {selectedSport && (
        <Stack spacing={4}>
          <FormLabel>Select Position</FormLabel>
          <Select placeholder="Select Position" onChange={(e) => handlePositionChange(e, e.target.value)}>
            {sportPositions[selectedSport].map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </Select>
          {Object.keys(selectedPositions).map((position) => (
            <Box key={position}>
              <FormControl id={`position-${position}`} isRequired>
                <FormLabel>{position}</FormLabel>
                <NumberInput
                  min={0}
                  value={selectedPositions[position] || ''}
                  onChange={(value) => handlePositionChange({ target: { value } }, position)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default UpsertEventPage;
