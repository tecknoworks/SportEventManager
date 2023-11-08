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

const DetailsPage = () => {
    return (
        <Container maxW="container.md" bg="white" p={4} borderRadius="lg" boxShadow="md">
            <VStack spacing={4} align="stretch">
                <Heading as="h1" size="xl" color="purple.500">fotbal1</Heading>
                <Text fontSize="md">5 vs 5 players</Text>
                <Text fontSize="md">Football</Text>
                <Text fontSize="md">Location: Cluj</Text>
                <Text fontSize="md">Start Date: November 8, 2023, 10:57 AM</Text>
                <Text fontSize="md">End Date: November 8, 2023, 10:57 AM</Text>
                <HStack>
                    <Text fontSize="md">Skill Level:</Text>
                    <Tag size="sm" variant="solid" colorScheme="purple">Beginner</Tag>
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