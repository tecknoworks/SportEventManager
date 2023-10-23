import React, { FormEvent, useEffect } from 'react'
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
    const [error, setError] = React.useState<string>("")

    const [userName, setUserName] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [phoneNumber, setPhoneNumber] = React.useState<number>(0)
    const [password, setPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>("")

    const checkIfEmptyInputValues = () : boolean => {
        if (userName !== ""
            && email !== ""
            && phoneNumber !== 0
            && password !== ""
            && confirmPassword !== "") {
            return false
        }

        return true
    }

    const checkIfPasswordEqualsConfirmPassword = () : boolean=> {
        if (password === confirmPassword)
            return true
        return false
    }

    useEffect(() => {
        if (!checkIfEmptyInputValues()
            && checkIfPasswordEqualsConfirmPassword()) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [userName, email, phoneNumber, password, confirmPassword])

    const handleClickShowPw = () : void => setShowPw(!showPw)
    const handleClickShowCpw = () : void => setShowCpw(!showCpw)

    function handleSubmit(event: FormEvent): void {
        event.preventDefault()

        if(password == "da")
            setError('Function not implemented.')
    }

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
            <form className="form-container" onSubmit={handleSubmit}>
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
                            <InputLeftAddon children="tel" />
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
                        <FormHelperText color="#610C9F">Confirm password must match the password!</FormHelperText>
                    </FormControl>
                    <Text color="red.500" textAlign="center" fontSize='md'>{error}</Text>
                    <Button type="submit" color="#610C9F" size="md" variant="solid" isDisabled={isDisabled}>
                        Create account
                    </Button>
                </Stack>

            </form>
        </Box>
    )
}

export default SignupForm
