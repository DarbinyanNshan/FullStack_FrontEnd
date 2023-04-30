import {
  Box,
  Card,
  Grid,
  Text,
  Stack,
  Button,
  Divider,
  Heading,
  CardBody,
  useToast,
  GridItem,
  CardFooter,
} from "@chakra-ui/react";
import { 
   DeleteIcon,
   EditIcon
} from '@chakra-ui/icons'
import axios from "axios";
import { 
  useEffect, 
  useState
} from "react";
import { 
  AddTaskModal 
} from "../../componets/modals/task-modal";
import { 
  useAuth 
} from "../../componets/contexts/AuthContexts";

export const Task = () => {
  
  const { user } = useAuth()
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getAllAdminTasks = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    await axios
      .get(`http://localhost:3001/tasks/admin/${user._id}`, config)
      .then((response) => {
        setTasks([...response.data.result]);
      })
      .catch((err) => { });
  };
  const toast = useToast();
  const successToast = (message) => {
    return toast({
      title: "Account created.",
      description: message,
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
  const getAllUserTasks = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    await axios
      .get(`http://localhost:3001/tasks/user/${user._id}`, config)
      .then((response) => {
        setTasks([...response.data.result]);
        setLoaded(true);
      })
      .catch((err) => { });
  };

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };

    await axios
      .get(`http://localhost:3001/users`, config)
      .then((response) => {
        setUsers([...response.data.result]);
        setLoaded(true);
      })
      .catch((err) => { });
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem("token");
    const deletedTask = tasks.find(p => p._id === id)
    const newTasks = tasks.filter(p => p !== deletedTask)
    setTasks([
      ...newTasks
    ])

    const config = {
      headers: { Authentication: token },
    };
    await axios
      .delete(`http://localhost:3001/delete-task/${id}`, config)
      .then((response) => {
        successToast("Task deleted");
        setLoaded(true);

      })
      .catch((err) => {
        console.log(err);
        if (err) errorToast("Delete error");

      });
  };
  const onEdit = async (data) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    await axios
      .put("http://localhost:3001/update-task", data, config)
      .then((response) => {
        successToast("Task Updated");
      })
      .catch((error) => {
        errorToast(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllUsers();
    if (user.role === "admin") {
      getAllAdminTasks();
    } else {
      getAllUserTasks();
    }
  }, []);

  const renderTasks = (status) => {
    const newTasks = tasks.filter((task) => task.status === status);
    return newTasks.map((task) => {
      return (
        <Card border="1px solid black" key={task?._id} mt={10} maxW="sm">
          <CardBody position="relative">
            <Button
              onClick={() => onDelete(task?._id)}
              backgroundColor="red"
              position="absolute"
              top="0"
              right="0"
            >
              <DeleteIcon />
            </Button>
            <Button
              backgroundColor="#042331"
              color={'white'}
              position="absolute"
              ml={'40px'}
              mt={'-20px'}
            >
              <AddTaskModal
                onSubmit={onEdit}
                data={task}
                backgroundColor="#0074E0"
                editble={true}
                position="absolute"
                top="0"
                left="0"
                button={<EditIcon />}
              />
            </Button>

            <Stack spacing="3" mt={10}>
              <Heading size="md">{task.title}</Heading>
              <Text textTransform="lowercase" color="green">
                {task.description}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Box>
              <Grid
                gap={10}
                alignContent="center"
                templateColumns="repeat(2, auto)"
              >
                <GridItem>
                  <Text></Text>
                </GridItem>
                <GridItem>
                  <Text>{new Date(task.createdAt).toLocaleString()}</Text>
                </GridItem>
              </Grid>
            </Box>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <Box>
      <Grid
        color="black"
        textAlign="center"
        p={2}
        textTransform="uppercase"
        justifyContent="space-between"
        textDecoration="none"
        templateColumns="repeat(4, 300px)"
        gap={10}
      >
        <GridItem>
          <Heading mb={4} size="md">
            TO DO
          </Heading>
          {tasks.length > 0 ? renderTasks("toDo") : <Text></Text>}
        </GridItem>
        <GridItem>
          <Heading mb={4} size="md">
            IIN PROGRESS
          </Heading>
          {tasks.length > 0 ? renderTasks("inProgress") : <Text></Text>}
        </GridItem>
        <GridItem>
          <Heading mb={4} size="md">
            READY FOR QA
          </Heading>
          {tasks.length > 0 ? renderTasks("readyQA") : <Text></Text>}
        </GridItem>
        <GridItem>
          <Heading mb={4} size="md">
            DONE
          </Heading>
          {tasks.length > 0 ? renderTasks("done") : <Text></Text>}
        </GridItem>
      </Grid>
    </Box>
  );
};