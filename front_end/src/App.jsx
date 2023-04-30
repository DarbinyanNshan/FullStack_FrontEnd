import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login/login';
import { Header } from './componets/header';
import { useAuth } from './componets/contexts/AuthContexts';
import { Task } from './pages/board/board';

function App() {
  const { user } = useAuth()

  return (
    <>
      {user ?
        <>
          <Header />
          <Routes>
            <Route path="/board" element={<Task />} />

            <Route path="/*" element={<Task />} />
          </Routes>
        </> :
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      }
    </>
  );
}

export default App;