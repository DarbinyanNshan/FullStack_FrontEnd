import React from "react";
import axios from "axios";
import {
    Button,
    useToast,
    Tooltip,
} from '@chakra-ui/react'
import {
    DeleteIcon
} from '@chakra-ui/icons'



export default function DeletePost({ userId, onDelete }) {
    const toast = useToast()
    
    const Delet = () => {
        onDelete(userId)
        axios.put('http://localhost:3001/delete-users',
            {
                id: userId,
            },
        )
            .then((res) => {
                toast({
                    title: 'Delete User.',
                    description: "",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .catch((err) => {
                toast({
                    title: 'User Not Deleted ',
                    description: err.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }

    return (
        <>
            <Button
                onClick={Delet}
                mt={2}
                fontSize={13}

            >
                <Tooltip
                    label='Delete User'
                >
                    <DeleteIcon/>
                </Tooltip>

            </Button>
        </>
    )
}