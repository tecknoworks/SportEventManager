import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Tag,
    Button,
    Container,
    Divider,
    useMediaQuery
} from '@chakra-ui/react';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { selectEventDetails } from './store/selectors/detailsSelector';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';
import Map from 'common/components/Map/Map';
import { LatLng } from 'common/components/Map/models';




const DetailsPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const details = useSelector(selectEventDetails)
    const { eventId } = useParams();


    useEffect(() => {
        dispatch(getEventThunk(`${eventId}`));

    }, []);

    const {
        authorUserId,
        authorUserName,
        description,
        endDate,
        eventPositions,
        hasPositions,
        id,
        isClosed,
        location,
        locationName,
        maximumParticipants,
        name,
        participants,
        skillLevel,
        sportTypeId,
        sportTypeName,
        startDate
    } = details;

    const [isResizable] = useMediaQuery('(max-width: 1136px)');
    const [latString, lngString] = location ? location.split(',') : [null, null];
    const lat = latString ? parseFloat(latString) : 0;
    const lng = lngString ? parseFloat(lngString) : 0;
    const center: LatLng = {
        lat: lat,
        lng: lng,
    };





    const parsedDateStart = startDate ? parseISO(startDate) : null;
    const formattedDateStart = parsedDateStart ? format(parsedDateStart, "HH:mm dd-MM-yyyy") : '';

    const parsedDateEnd = endDate ? parseISO(endDate) : null;
    const formattedDateEnd = parsedDateEnd ? format(parsedDateEnd, "HH:mm dd-MM-yyyy") : '';

    const getColorScheme = (skillLevel: any) => {
        switch (skillLevel) {
            case 0: return 'green';
            case 1: return 'blue';
            case 2: return 'red';
            default: return 'gray';
        }
    };

    const getSkillLevelText = (skillLevel: any) => {
        switch (skillLevel) {
            case 0: return 'Beginner';
            case 1: return 'Intermediate';
            case 2: return 'Advanced';
            default: return 'Unknown';
        }
    };



    return (
        <Container maxW="container.md" bg="white" p={4} borderRadius="lg" boxShadow="md">

            <VStack spacing={4} align="stretch">
                <Heading as="h1" size="xl" color="purple.700">{name}</Heading>
                <Heading as="h3" size="md" color="purple.300">Organizer : {authorUserName}</Heading>
                <Text fontSize="md">{description} descriptions</Text>
                <Text fontSize="md">{sportTypeName}</Text>
                <Text fontSize="md">Location: {locationName}</Text>
                <Text fontSize="md">Start Date:{formattedDateStart} </Text>
                <Text fontSize="md">End Date:{formattedDateEnd}</Text>
                <HStack>
                    <Text fontSize="md">Skill Level:</Text>
                    <Tag size="sm" variant="solid" colorScheme={getColorScheme(skillLevel)}>
                        {getSkillLevelText(skillLevel)}
                    </Tag>
                </HStack>
                <Divider />
                <VStack spacing={2} align="stretch">
                    <Heading as="h3" size="md" color="purple.500">Positions</Heading>
                    <Box>
                        <Text fontSize="md">Midfielder: 0 available positions</Text>
                        <Button size="sm" disabled>Join</Button>
                    </Box>
                </VStack>
                <Divider />
                <VStack spacing={2} align="stretch">
                    <Heading as="h3" size="md" color="purple.500">Participants</Heading>
                    <Box>
                        <HStack justifyContent="space-between">
                            <Text fontSize="md">Midfielder</Text>
                            <Text fontSize="md">User 1</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text fontSize="md">Midfielder</Text>
                            <Text fontSize="md">User 2</Text>
                        </HStack>
                    </Box>
                </VStack>
                <div >
                    <Map isResizable={isResizable} center={center} />
                </div>

            </VStack>
        </Container>
    );
}

export default DetailsPage