import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
axios.defaults.withCredentials = true; // Importante para enviar cookies

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/api/check-auth')
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setLoading(false));
    }, []);

    const login = async (user, password) => {
        await axios.post('http://localhost:4000/api/login', { user, password });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await axios.post('http://localhost:4000/api/logout');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);