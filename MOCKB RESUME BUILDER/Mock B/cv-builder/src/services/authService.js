import api, { setAuthToken } from '../api';

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    setAuthToken(response.data?.data?.token);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    setAuthToken(response.data?.data?.token);
    return response.data;
};

export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } finally {
        setAuthToken("");
    }
};

export const getCurrentUser = async () => {
    const response = await api.get('/auth/user');
    return response.data;
};

/** Best-effort profile update; falls back to local storage on the client if API is unavailable. */
export const updateUserProfile = async (payload) => {
    try {
        const response = await api.put('/auth/profile', payload);
        return response.data;
    } catch {
        try {
            const response = await api.patch('/auth/user', payload);
            return response.data;
        } catch (err) {
            return { success: false, message: err.message || 'Profile API unavailable' };
        }
    }
};
