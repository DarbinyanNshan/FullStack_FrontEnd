import { 
    useEffect, 
    useState,
    useContext,
    createContext
} from "react";
import { 
    getUserFromLocal 
} from "../helpers";
import axios from 'axios';
const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocal());

    useEffect(() => {
        axios.get('http://localhost:3001/me', {
            headers: { Authentication: localStorage.getItem("token") }
        }).then((res) => {
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    const updateUser = (user) => {
        setUser(getUserFromLocal());
        localStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }