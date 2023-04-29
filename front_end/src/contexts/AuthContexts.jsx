import axios from "axios"
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    getUserFromLocalStorage
} from "../helpers";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [role, setRole] = useState(user.role)
    const updateUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }
    return (
        <AuthContext.Provider value={{ user, role, setUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }