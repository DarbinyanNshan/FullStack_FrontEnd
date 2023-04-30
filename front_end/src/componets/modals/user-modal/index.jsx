import {

  Text,
  Grid,
  Input,
  Modal,
  Button,
  Center,
  GridItem,
  useToast,
  ModalBody,
  ModalHeader,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton
} from "@chakra-ui/react";
import axios from "axios";
import { 
  useForm 
} from "react-hook-form";

export const AddUserModal = () => {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    mode: "onBlur", 
  });

const toast = useToast();
const { isOpen, onOpen, onClose } = useDisclosure();

const successToast = () => {
  return toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 3000,
    isClosable: true,
  });
};
const errorToast = (message) => {
  return toast({
    title: "Sorry.",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};


  const onSignUp = async (data) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const allData = {...data,createdAt:Date.now(),role:"user"};
    await axios
      .post("http://localhost:3001/sign-up-user", allData,config)
      .then(function (response) {
        successToast();
        reset();
        onClose()
      })
      .catch(function (error) {
        errorToast(error.response.data.message);
      });
  };
  return (
    <>
      <Text cursor="pointer"  onClick={onOpen}>Add User</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSignUp)}>
              <FormControl>
                <Grid  templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <Input
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "Name is not valid",
                        },
                      })}
                    />
                    <Text color="red">
                      {errors?.firstName && errors?.firstName?.message}
                    </Text>
                  </GridItem>
                  <GridItem w="100%">
                    <Input
                      w="200px"
                      placeholder="Last Name"
                      {...register(
                        "lastName",

                        {
                          required: "Last name is required",
                          minLength: {
                            value: 3,
                            message: "Last Name is not valid",
                          },
                        }
                      )}
                    />
                    <Text color="red">
                      {errors?.lastName && errors?.lastName?.message}
                    </Text>
                  </GridItem>
                </Grid>
                <Input
                  mt={'20px'}
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <br></br>
                <Text color="red">
                  {errors?.email && errors?.email?.message}
                </Text>
                <br></br>
                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <br></br>
                <Text color="red">
                  {errors?.password && errors?.password?.message}
                </Text>
                <br></br>
                <Center>
                    <Button
                      borderColor="#08BDA9"
                      color={'white'}
                      bg="#042331"
                      px={20}
                      py={5}
                      type="submit"
                    >
                      Add User
                    </Button>
                </Center>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

