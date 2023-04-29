import axios from "axios"
import React from "react";
import {
    useForm
} from 'react-hook-form'
import {
    Text,
    Input,
    Modal,
    Button,
    useToast,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalCloseButton
} from '@chakra-ui/react'
import {
    useAuth
} from "../contexts/AuthContexts";

export default function CreateTask({ isOpen, onClose, }) {
    const { user } = useAuth()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const toast = useToast()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()


    const onSubmit = (data) => {
        axios.post('http://localhost:3001/creat-task',
            {
                ...data,
                id: user._id,
                createdAt: Date.now()
            }
        )
            .then((res) => {
                onClose()
                toast({
                    title: 'Task created.',
                    description: "We've created your Task for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((err) => {
                toast({
                    title: 'SignIn faild',
                    description: err.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })

    }



    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            mt={90}
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Create Task
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody  >
                        <Input
                            placeholder="Title"
                            mt={6}
                            {...register('title',
                                { required: 'This is required Title' }
                            )}
                        />
                        {
                            errors?.title && (
                                <Text
                                    fontSize='xs'
                                    color='red'
                                >
                                    {errors?.title?.message}
                                </Text>)
                        }

                        <Input
                            placeholder="Description"
                            mt={6}
                            {...register('description',
                                { required: 'This is required description' }
                            )}
                        />
                        {
                            errors?.description && (
                                <Text
                                    fontSize='xs'
                                    color='red'
                                >
                                    {errors?.description?.message}
                                </Text>)
                        }

                        <Input
                            placeholder="Assigned"
                            mt={6}
                            {...register('assigned',
                                { required: 'This is required Assigned' }
                            )}
                        />
                        {
                            errors?.assigned && (
                                <Text
                                    fontSize='xs'
                                    color='red'
                                >
                                    {errors?.assigned?.message}
                                </Text>)
                        }

                        <Input
                            placeholder=" Status"
                            mt={6}
                            {...register('status',
                                { required: 'This is required Age' }
                            )}
                        />
                        {
                            errors?.status && (
                                <Text
                                    fontSize='xs'
                                    color='red'
                                >
                                    {errors?.status?.message}
                                </Text>)
                        }


                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type='submit'
                            mr={3}
                            colorScheme='green'
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>



    )
}