import React from "react";

import {
  Box,
  Flex,
  Button
} from '@chakra-ui/react';
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import {
  useAuth
} from "../contexts/AuthContexts";

export default function Header() {
  const navigate = useNavigate()
  const { role } = useAuth()
  const Logout = () => {
    navigate('/');
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <Flex>
      {!role ?
        <NavLink to='/'>
        </NavLink> : null}

      {role === "Admin" ?
        <Box
          ml={'200px'}
          display={"flex"}
        >
          <Box
            mr={'20px'}>
            <NavLink to='/add-user'>
              Add User
            </NavLink>
          </Box>
          <Box
            mr={'20px'}>
            <NavLink to='/users'>
              Users
            </NavLink>
          </Box>
          <NavLink to='/board'>
            Board
          </NavLink>
          <Button
            onClick={Logout}
            ml={'40px'}
            fontSize={14}
            colorScheme='green'
          >
            Log Out
          </Button>
        </Box> : null}

    </Flex>
  );
}