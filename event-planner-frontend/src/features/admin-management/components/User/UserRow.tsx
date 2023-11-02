import { Tr, Td, Button, Tooltip, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon, EmailIcon } from '@chakra-ui/icons';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { isValidEmail } from 'common/validators/emailValidator';
import { isValidPhoneNumber } from 'common/validators/phoneNumberValidator';

type User = {
    userId: number;
    userName: string;
    email: string;
    phoneNumber: string;
}
interface UserRowProps {
    user: User;
    deleteUser: (userId: number) => void;
    sendRecoveryEmail: (email: string) => void;
}

/////////////////////////

interface Account {
    userName: string;
    email: string;
    phoneNumber: string;
}
/////////////////////

const UserRow: React.FC<UserRowProps> = ({ user, deleteUser, sendRecoveryEmail }) => {
    const [isEditing, setIsEditing] = useState(false)

    const [editUser, setEditUser] = useState<Account>({
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
    });

    //for eroors
    const [isDisabled, setIsDisabled] = useState<boolean | ''>(true);
    const [errorBe, setErrorBe] = useState<object[]>([]);


    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<string>('');
    const [userNameErrorMessage, setUserNameErrorMessage] = useState<string>('');

    const [account, setAccount] = useState<Account>({
        userName: '',
        email: '',
        phoneNumber: '',
    });

    const [debouncedAccount] = useDebounce(account, 1000);

    const checkIfEmptyInputValues = (): boolean => {
        if (
            account.userName !== '' &&
            account.email !== '' &&
            account.phoneNumber !== ''
        ) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        const errorEmailMessage = isValidEmail(debouncedAccount.email) ? '' : 'Not a valid email!';
        setEmailErrorMessage(debouncedAccount.email && errorEmailMessage);

        const errorPhoneNumberMessage = isValidPhoneNumber(debouncedAccount.phoneNumber) ? '' : 'Not a valid phone number!';
        setPhoneNumberErrorMessage(debouncedAccount.phoneNumber && errorPhoneNumberMessage);

        const isUserNameValid = debouncedAccount.userName.length >= 2;
        const errorUserNameMessage = isUserNameValid ? '' : 'User name not valid! (length must be greater than 2)';

        setUserNameErrorMessage(debouncedAccount.userName && errorUserNameMessage);

        setIsDisabled(
            !(
                isValidEmail(debouncedAccount.email) &&
                isUserNameValid &&
                isValidPhoneNumber(debouncedAccount.phoneNumber) &&
                !checkIfEmptyInputValues()
            )
        );
    }, [debouncedAccount]);

    useEffect(() => {
        setErrorBe([]);
    }, []);


    function handleSubmit(event: FormEvent): void {
        event.preventDefault();

        const data = {
            userName: account.userName,
            email: account.email,
            phoneNumber: account.phoneNumber,
        };
        // dispatch(createUser(data));
    }


    /////////////////////////





    return (
        <Tr>
            <Td>
                {isEditing ? (
                    <FormControl isInvalid={userNameErrorMessage.length > 0}>
                        <Input
                            defaultValue={editUser.userName}
                            onChange={(e) => setEditUser({ ...editUser, userName: e.target.value })}
                        />
                        <FormErrorMessage>{userNameErrorMessage}</FormErrorMessage>
                    </FormControl>
                ) : (
                    user.userName
                )}
            </Td>
            <Td>
                {isEditing ? (
                    <Input defaultValue={user.email} />
                ) : (
                    user.email
                )}
            </Td>
            <Td>
                {isEditing ? (
                    <Input defaultValue={user.phoneNumber} />
                ) : (
                    user.phoneNumber
                )}
            </Td>
            <Td display='flex' justifyContent='flex-end'>
                <Tooltip label={isEditing ? 'Save changes' : 'Edit user'}>
                    <Button mr='3' bg={isEditing ? 'orange.300' : 'blue.300'} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? <CheckIcon /> : <EditIcon />}
                    </Button>
                </Tooltip>
                <Tooltip label='Send Recovery Email'>
                    <Button mr='3' bg={'green.300'} onClick={() => sendRecoveryEmail(user.email)}><EmailIcon /></Button>
                </Tooltip>
                <Tooltip label='Delete user'>
                    <Button bg={'red.300'} onClick={() => deleteUser(user.userId)}><DeleteIcon /></Button>
                </Tooltip>

            </Td>
        </Tr>
    );
};

export default UserRow;


