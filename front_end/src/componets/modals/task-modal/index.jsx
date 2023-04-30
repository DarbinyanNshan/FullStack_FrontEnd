import {
    Box,
    Text,
    Input,
    Modal,
    Select,
    Button,
    Center,
    Textarea,
    ModalBody,
    FormControl,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    useDisclosure,
    ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { 
    useEffect,
    useState
} from "react";
  import { 
    useForm
} from "react-hook-form";
  
  export const AddTaskModal = ({onSubmit,button, data, editble}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
    });
    const [users, setUsers] = useState([]);
    const getAllUsers = async() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authentication: token },
      };
  
     await axios
        .get(`http://localhost:3001/users`, config)
        .then((response) => {
          setUsers([...response.data.result]);
          onClose()
        })
        .catch((err) => {});
    };
  
    useEffect(() => {
      getAllUsers();
      reset(data)
    }, []);
  
  
  
  
    return (
      <>
        <Text cursor="pointer" onClick={onOpen}>{button}</Text>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                      <Input mb={8}
                        placeholder="Title"
                        {...register("title", {
                          required: "Title is required",
                          minLength: {
                            value: 2,
                            message: "Title is not valid",
                          },
                        })}
                      />
                      <Text color="tomato">
                        {errors?.title && errors?.title?.message}
                      </Text>
                      <Textarea mb={8 }
                        placeholder="Description"
                        {...register(
                          "description",
                          {
                            required: "Description is required",
                            minLength: {
                              value: 3,
                              message: "Description is not valid",
                            },
                          }
                        )}
                      />
                      <Text color="tomato">
                        {errors?.description && errors?.description?.message}
                      </Text>
                  
                  <Select mb={5} placeholder="Users"  {...register("assignedUserId")}>
                  {users?.map(user =>{
                        return <option value={user._id} >{user.firstName} {user.lastName}</option>
                      })}
                  </Select>
                  { editble ?<Box>
                    <Select
                      mb={5}
                      placeholder="Status"
                      {...register("status")}
                    >
                      <option value="toDo">To Do</option>
                      <option value="inProgress">In Progress</option>
                      <option value="readyQA">Ready For QA</option>
                      <option value="done">Done</option>
                    </Select>
                  </Box>:null}
                  <Center>
                    <Button
                      borderColor="white"
                      color={'white'}
                      bg="#042331"
                      px={20}
                      py={5}
                      type="submit"
                    >
                      ADD TASK
                    </Button>
                  </Center>
                </FormControl>
            
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  