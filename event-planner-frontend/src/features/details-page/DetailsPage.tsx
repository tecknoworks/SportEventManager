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
    Divider
} from '@chakra-ui/react';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { selectEventDetails } from './store/selectors/detailsSelector';
import { useParams } from 'react-router-dom';



const DetailsPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const details = useSelector(selectEventDetails)
    const { eventId } = useParams();

    useEffect(() => {
        dispatch(getEventThunk(`${eventId}`));

    }, []);


    console.log(details);


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

    let parts = startDate?.split(/[-T:.]/);

    let formattedStartDate = `${parts[3]}:${parts[4]} ${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log(formattedStartDate); // Outputs: "10:57 08-11-2023"


    return (
        <Container maxW="container.md" bg="white" p={4} borderRadius="lg" boxShadow="md">

            <VStack spacing={4} align="stretch">
                <Heading as="h1" size="xl" color="purple.500">{name}</Heading>
                <Heading as="h3" size="md" color="purple.300">Organizer : {authorUserName}</Heading>
                <Text fontSize="md">{description} descriptions</Text>
                <Text fontSize="md">{sportTypeName}</Text>
                <Text fontSize="md">Location: {locationName}</Text>
                <Text fontSize="md">Start Date: {formattedStartDate}</Text>
                <Text fontSize="md">End Date:{endDate}</Text>
                <HStack>
                    <Text fontSize="md">Skill Level:</Text>
                    <Tag size="sm" variant="solid" colorScheme="purple">{skillLevel}</Tag>
                </HStack>
                <Divider />
                <VStack spacing={2} align="stretch">
                    <Heading as="h3" size="md" color="purple.500">Positions</Heading>
                    <Box>
                        <Text fontSize="md">Midfielder: 0 available positions</Text>
                        <Button size="sm" disabled>Full</Button>
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
            </VStack>
        </Container>
    );
}

export default DetailsPage