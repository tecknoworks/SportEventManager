import { FormControl, Box, FormLabel, Heading, Select, Stack, Input } from '@chakra-ui/react';
import React from 'react';

function EventForm() {
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
    setSelectedPositions({});
  };

  type SportType = 'sport1id' | 'sport2id';
  type Positions = { [key: string]: string };

  const sportPositions: Record<SportType, string[]> = {
    sport1id: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    sport2id: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  };

  return (
    <Box
      className="form-wrapper"
      gap="1rem"
      display="flex"
      width="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Heading>Create your event</Heading>
      <FormControl isRequired>
        <FormLabel>Event Name</FormLabel>
        <Input type="text" placeholder="Give a meaningful name to your event." />
      </FormControl>
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
                <Input
                  min={0}
                  type="number"
                  value={selectedPositions[position] || ''}
                  onChange={(value) => handlePositionChange({ target: { value } }, position)}
                ></Input>
              </FormControl>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default EventForm;
