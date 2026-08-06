import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const data = await getCurrentUser();
            if (data?.success) {
                setUser(data.data);
                return data.data;
            }
            setUser(null);
            return null;
        } catch {
            setUser(null);
            return null;
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            await refreshUser();
            setLoading(false);
        };
        checkAuth();
    }, [refreshUser]);

    const login = async (credentials) => {
        const data = await loginUser(credentials);
        if (data?.success) {
            setUser(data.data?.user || data.data);
        }
        return data;
    };

    const register = async (userData) => {
        const data = await registerUser(userData);
        return data;
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
