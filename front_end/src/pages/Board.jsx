import axios from "axios"
import React, { useEffect, useState } from "react"

import {
    Box,
    Flex,
    Text,
    Grid,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import CreateTask from "./CreatTask"

export default function Board() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [task, setTask] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/users/user._id/tasks`,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                setTask(res.data.tasks);
            })
    }, [])

    return (
        <>
            <Box
                mt={2}
                ml={20}
            >
                <Button
                    fontSize={13}
                    ml={5}
                    mt={2}
                    mr={5}
                    onClick={onOpen}
                >
                    Creat Task
                </Button>
                <CreateTask
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </Box>
            <Flex
                direction="column"
                justifyContent="center"
                maxW={{ xl: "1200px" }}
                m="0 auto"
                minH="40vh"
            >
                <Grid
                    mt={10}
                    w="full"
                    gridGap="20"
                    gridTemplateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
                >  {task.map((item, index) => {
                    return <Box key={index}
                        ml={'20px'}>
                        <Text> TODO</Text>
                        <Box
                            bg='#f4f4f4'
                            w='100%'
                            height='100%'
                            p={4}
                            border={'1px solid'}
                        >
                            <Text>Title : {item.title}</Text>
                            <Text>Description : {item.description}</Text>
                            <Text>assigned : {item.assigned}</Text>
                            <Text>status : {item.status}</Text>


                        </Box>
                    </Box>
                })}
                    <Box
                        ml={'20px'}>
                        <Text> PROGRES</Text>
                        <Box
                            bg='#f4f4f4'
                            w='100%'
                            height='100%'
                            p={4}
                            border={'1px solid'}
                        >

                        </Box>
                    </Box>
                    <Box
                        ml={'20px'}>
                        <Text>READ FOR QA</Text>
                        <Box
                            bg='#f4f4f4'
                            w='100%'
                            height='100%'
                            p={4}
                            border={'1px solid'}
                        >

                        </Box>
                    </Box>
                    <Box
                        ml={'20px'}>
                        <Text>DONE</Text>
                        <Box
                            bg='#f4f4f4'
                            w='100%'
                            height='100%'
                            p={4}
                            border={'1px solid'}
                        >

                        </Box>
                    </Box>

                </Grid>
            </Flex >
        </>
    )
}