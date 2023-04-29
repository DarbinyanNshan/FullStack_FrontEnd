import axios from "axios"
import {
  useForm
} from 'react-hook-form'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Heading,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

export default function SignIn() {
  const navigate = useNavigate()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await axios.post('http://localhost:3001/signin', data)
      .then((res) => {
        const { user, token } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/board');
        window.location.reload()
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((err) => {
        console.log(err.response.data)
        toast({
          title: 'Account unregistered ',
          description: err.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })

  }

  return (
    <Flex
      w='100%'
      h='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <Box w='50%'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading  >Login</Heading>
          <Input
            type="email"
            placeholder="Email"
            mt={6}
            {...register('email',
              { required: 'This is required Email' }
            )}
          />
          {
            errors?.email && (
              <Text
                fontSize='xs'
                color='red'
              >
                {errors?.email?.message}
              </Text>)
          }
          <Input
            type="password"
            placeholder="Password"
            mt={6}
            {...register('password',
              { required: 'This is required Password' }
            )}
          />
          {
            errors?.password && (
              <Text
                fontSize='xs'
                color='red'
              >
                {errors?.password?.message}
              </Text>)}

          <Button
            type="submit"
            mt={4}
            colorScheme='green'
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>


  )


}