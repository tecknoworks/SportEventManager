import { Card, CardBody, Text, CardFooter, StackDivider, Stack, Box, useMediaQuery } from '@chakra-ui/react';
import SecondaryButton from '../buttons/SecondaryButton';
import { EventDto } from 'features/browse-events/api/dtos';
import { format } from 'date-fns';
import { LatLng } from '../Map/models';
import Map from '../Map/Map';

interface Props {
  event: EventDto;
}

const EventCard = ({ event }: Props) => {
  const [isResizable] = useMediaQuery('(max-width: 1136px)');
  const formattedStartDate = format(new Date(event.startDate), 'MM/dd/yyyy HH:mm');
  const [latString, lngString] = event.location.split(',');
  const lat = parseFloat(latString);
  const lng = parseFloat(lngString);
  const center: LatLng = {
    lat: lat,
    lng: lng,
  };
  return (
    <Card variant="elevated" w="100%">
      <CardBody
        display="flex"
        alignItems="center"
        flexDirection={!isResizable ? 'row' : 'column'}
        justifyContent="space-between"
      >
        <Stack width={!isResizable ? '40%' : '100%'} divider={<StackDivider />}>
          <Text as="b">{event.name}</Text>
          <Text>{formattedStartDate}</Text>
          <Text>{event.description}</Text>
          {event.location}
        </Stack>

        <Map isResizable={isResizable} center={center} />
      </CardBody>
      <CardFooter>
        <SecondaryButton text="More details" />
      </CardFooter>
    </Card>
  );
};

export default EventCard;
