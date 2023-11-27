import { useEffect } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Input, List, ListItem, useColorMode } from '@chakra-ui/react';
import { geocode, RequestType, setKey } from 'react-geocode';

type Props = {
  onCoordinatesChange: (param: any) => any;
  onAddressChange: (param: any) => any;
  address: string;
  initialAddress: string;
};

function LocationSearch({ onCoordinatesChange, onAddressChange, initialAddress, address }: Props) {
  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    onAddressChange(value);
    onCoordinatesChange(latLng);
  };

  setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '');

  useEffect(() => {
    if (initialAddress) {
      getAddressFromCoordinates(initialAddress);
    }
  }, [initialAddress]);

  const getAddressFromCoordinates = (location: string) => {
    geocode(RequestType.LATLNG, location)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        onAddressChange(address);
      })
      .catch(console.error);
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? '#2d3748' : 'white'; 

  return (
    <>
      <PlacesAutocomplete value={address} onChange={onAddressChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
              })}
            />
            <List spacing={3} w="full" bg={bgColor} maxH="15vh" overflowY="auto" minHeight="15vh">
              {loading ? (
                <ListItem>Loading...</ListItem>
              ) : (
                suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { bg: 'red', cursor: 'pointer' }
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
