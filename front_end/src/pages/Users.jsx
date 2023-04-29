import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Flex,
    Image,
} from '@chakra-ui/react';
import DeletePost from "./DeleteUser";

export default function Users() {
    const [users, setUsers] = useState([])
    const onDelete = (userId) => {
        const deletedPost = users.find( p => p._id === userId)
        const newUsers = users.filter( p => p  !== deletedPost )
        setUsers([ 
            ...newUsers
        ])}
        useEffect(() => {
        axios.get(`http://localhost:3001/get-users`,)
            .then((res) => {
                setUsers(res.data.users);
            })
    }, [])
      
    
    return (
        <>
            <Box
                top='0'
                left='10%'
                display={'flex'}
                padding={20}>
                <ul>
                    {users.map((user, i) => (
                        <Flex key={i}>
                            <Box
                                border='1px'
                                display={'flex'}
                                h={'100px'}
                                w={'300px'}
                                borderColor='black'
                                pb={2}
                                mb={3}
                                mt={10}
                            >
                                <Image
                                    h={45}
                                    w={45}
                                    ml={'10px'}
                                    borderRadius={20}
                                    src={`http://localhost:3001${user?.image}`}
                                />
                                <Box ml='4'>
                                    <Text fontWeight='bold'>
                                        {`${user.fristName} ${user.lastName}`}
                                    </Text>
                                </Box>
                                <DeletePost
                                            userId={user?._id}
                                            onDelete={onDelete}
                                        />
                            </Box>
                        </Flex>
                    ))}
                </ul>
            </Box>
        </>
    )
}