import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Text, 
  Input,
  Alert,
  Button,
  Heading,
  useToast,
  AlertIcon,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const [showError, setShowError] = useState(false);
  const toast = useToast();

  const successToast = () => {
    return toast({
      title: 'Success.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const errorToast = (massage) => {
    return toast({
      title: 'Sorry.',
      description: massage,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const signIn = async (data) => {
    await axios.post("http://localhost:3001/sign-in", data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        successToast();
        reset();
        navigate('/board');
      })
      .catch((error) => {
        errorToast(error.response.data.message);
      });
  };


  return (
    <Box maxWidth={400} mx="auto" mt={10} p={5} boxShadow="md" rounded="md">
      <Heading textAlign='center' pb={2} mb={4} size="md">
        Log In
      </Heading>
      {showError && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          Invalid email or password.
        </Alert>
      )}
      <form onSubmit={handleSubmit(signIn)}>
        <FormControl mb={3}>
          <Input type="text" placeholder="Email" {...register("email",
            {
              required: "Email is required",
            })} />
          <Text color="red">{errors?.email && errors?.email?.message}</Text><br></br>
        </FormControl>
        <FormControl mb={3}>
          <Input placeholder="Password" type="password"  {...register("password",
            {
              required: "Password is incorrect",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })} />
          {errors.password && <Box color="red">Password is required</Box>}
        </FormControl>
        <Button bgColor="#042331"
          color={'white'}
          type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};