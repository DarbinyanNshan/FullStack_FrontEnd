import axios from "axios"
import {
  useForm
} from 'react-hook-form'
import {
  useState
} from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Heading,
  useToast
} from '@chakra-ui/react'

export default function AddUser() {
  const [file, setFile] = useState(null)
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fristName", data.fristName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("password", data.password);
    formData.append("role", 'user');

    axios.post('http://localhost:3001/add-user', formData)
      .then((res) => {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
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

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };



  return (
    <Flex
      w='100%'
      h='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <Box w='50%'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>Creat User</Heading>
          <Input
            placeholder="Frist Name"
            mt={6}
            {...register('fristName',
              { required: 'This is required Frist Name' }
            )}
          />
          {
            errors?.fristName && (
              <Text
                fontSize='xs'
                color='red'
              >
                {errors?.fristName?.message}
              </Text>)
          }

          <Input
            placeholder="Last Name"
            mt={6}
            {...register('lastName',
              { required: 'This is required Last Name' }
            )}
          />
          {
            errors?.lastName && (
              <Text
                fontSize='xs'
                color='red'
              >
                {errors?.lastName?.message}
              </Text>)
          }

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
            type="number"
            placeholder="Age"
            mt={6}
            {...register('age',
              { required: 'This is required Age' }
            )}
          />
          {
            errors?.age && (
              <Text
                fontSize='xs'
                color='red'
              >
                {errors?.age?.message}
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
          <Input
            mt={10}
            size="md"
            type="file"
            onChange={onChange}

          />

          <Button
            type="submit"
            mt={4}
            colorScheme='green'
          >
            Create an User
          </Button>
        </form>
      </Box>
    </Flex>


  )
}