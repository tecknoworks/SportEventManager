import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Input, List, ListItem } from '@chakra-ui/react';

type Props = {
  onCoordinatesChange: (param: any) => any;
};

function LocationSearch({ onCoordinatesChange }: Props) {
  const [address, setAddress] = useState('');

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    onCoordinatesChange(latLng);
  };

  return (
    <>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
              })}
            />
            <List spacing={3} w="full" bg="white" maxH="15vh" overflowY="auto" minHeight="15vh">
              {loading ? (
                <ListItem>Loading...</ListItem>
              ) : (
                suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { bg: 'gray.100', cursor: 'pointer' }
                    : { bg: 'white', cursor: 'pointer' };
                  return (
                    <ListItem
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                      p={2}
                      _hover={{ bg: 'gray.50' }}
                    >
                      {suggestion.description}
                    </ListItem>
                  );
                })
              )}
            </List>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

export default LocationSearch;
