import React from 'react'
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    Alert,
    AlertIcon,
    Box, 
    AlertTitle, 
    AlertDescription, 
    CloseButton, 
    Button, 
    CircularProgress, 
    Stack, 
    Skeleton, 
    useToast, 
    Modal, 
    ModalOverlay, 
    ModalHeader, 
    ModalContent, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    WrapItem, 
    Avatar, 
    AvatarBadge, 
    Tooltip, 
    Card, 
    CardBody, 
    Heading, 
    CardFooter, 
    TableContainer, 
    Table, 
    TableCaption, 
    Tbody, 
    Td, 
    Tfoot,
    Th, 
    Thead, 
    Tr, 
    Highlight,
    ButtonGroup, 
    Editable, 
    EditableInput, 
    EditablePreview, 
    Flex, 
    Input, 
    useEditableControls
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { Image, Text, IconButton } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'

const ChakraReactComponent = () => {

    const {
        //isOpen: isVisible,
        isOpen,
        onClose,
        onOpen,
    } = useDisclosure()

    const toast = useToast()

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton  aria-label='edit' icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton  aria-label='edit' icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <IconButton  aria-label='edit' size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )
    }

    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                    <Tab>Three</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Tab 1</Tab>
                    <Tab>Tab 2</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* here is the alert button <>
                {isVisible ? (
                    <Alert status='success'>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Example alert description
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Alert>
                ) : (
                    <Button onClick={onOpen}>Show Alert</Button>
                )}
            </> */}
            <br /><br />
            <CircularProgress isIndeterminate color='green.300' />
            <br /><br />
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>

            <Button
                onClick={() =>
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            >
                Show Toast
            </Button>
            <br /><br />

            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Title 1</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eaque autem suscipit obcaecati, aut aperiam facere, fugiat nostrum officiis ipsa voluptas neque veniam voluptate alias commodi assumenda, ipsam accusantium deleniti?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Button</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <br /><br />
            <Sidebar />
            <br /><br />
            <Stack direction='row' spacing={4}>
                <Avatar name='Bogdan Filip' >
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
                <Avatar name='Bogdan Filip' >
                    <AvatarBadge boxSize='1.25em' bg='red.500' />
                </Avatar>
            </Stack>
            <br /> <br />
            <Tooltip hasArrow label='Search!' bg='gray.300' color='black'>
                <SearchIcon />
            </Tooltip>

            <br /> <br />
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://th.bing.com/th/id/OIP.1d6dLA9oDDomSM8iIL2JKwHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'
                    alt='Football game'
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>Caut 2 jucatori pentru un meci de fotbal (portar si fundas)</Heading>

                        <Text py='2'>
                            Sunt un incepator la fotbal, dar m-am strans cu mai multi pentru un meci si mai avem nevoie de 2 jucatori
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Join
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
            <br></br><br></br>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <br></br>
            <Highlight query='spotlight' styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                With the Highlight component, you can spotlight words.
            </Highlight>
            <br></br>
            <Editable
                textAlign='center'
                defaultValue='Bogdan'
                fontSize='2xl'
                isPreviewFocusable={false}
            >
                <EditablePreview />
                {/* Here is the custom input */}
                <Input as={EditableInput} />
                <EditableControls />
            </Editable>
            )
        </>
    )
}

export default ChakraReactComponent
