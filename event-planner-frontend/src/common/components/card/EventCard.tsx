import { Card, CardBody, Heading, Stack, Text, Image, CardFooter, Button } from '@chakra-ui/react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

interface Props {
  id: number;
}

const EventCard = ({ id }: Props) => {
  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />
      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">{id}</Text>
        </CardBody>

        <CardFooter>
          <SecondaryButton text="Join Event" />
          <PrimaryButton text="More details" />
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default EventCard;
