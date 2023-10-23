import React, { useEffect } from 'react'
import "common/styles/form.scss"
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Stack,
    Text
} from '@chakra-ui/react'

const SignupForm = () => {
    const [showPw, setShowPw] = React.useState<boolean>(false)
    const [showCpw, setShowCpw] = React.useState<boolean>(false)
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true)

    const [userName, setUserName] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [phoneNumber, setPhoneNumber] = React.useState<number>(0)
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    useEffect(() => {
        if (userName !== ""
            && email !== ""
            && phoneNumber !== 0
            && password !== ""
            && confirmPassword !== "" 
            && password === confirmPassword) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [userName, email, phoneNumber, password, confirmPassword])

    const handleClickShowPw = () => setShowPw(!showPw)
    const handleClickShowCpw = () => setShowCpw(!showCpw)

    return (
        <Box
            className="form-wrapper"
            display="flex"
            width="500px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
        >
            <Text color="gray.500" as="b" fontSize="3xl">
                Signup
            </Text>
            <form className="form-container">
                <Stack spacing={5}>
                    <FormControl isRequired>
                        <FormLabel>User name</FormLabel>
                        <Input type="text" placeholder="User name" onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Phone number</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children="+40" />
                            <Input type="number" placeholder="Phone number" onChange={(e) => setPhoneNumber(Number(e.target.value))} />
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="75px"
                                type={showPw ? "text" : "password"}
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width="75px">
                                <Button h="28px" size="sm" onClick={handleClickShowPw} >
                                    {showPw ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="#610C9F">Don't share this password with anyone!</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="75px"
                                type={showCpw ? "text" : "password"}
                                placeholder="Enter password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <InputRightElement width="75px">
                                <Button h="28px" size="sm" onClick={handleClickShowCpw}>
                                    {showCpw ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button color="#610C9F" size="md" variant="solid" isDisabled={isDisabled}>
                        Create account
                    </Button>
                </Stack>

            </form>
        </Box>
    )
}

export default SignupForm
