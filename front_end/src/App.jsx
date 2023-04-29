import Header from "./componets/Header";
import SignIn from "./pages/Signin";
import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import AddUser from "./pages/AddUser";
import { AuthProvider } from "./contexts/AuthContexts";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/board' element={<Board />} />
          <Route path='/add-user' element={<AddUser />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
