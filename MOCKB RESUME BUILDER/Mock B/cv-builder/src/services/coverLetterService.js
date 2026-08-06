import api from '../api';

export const getCoverLetters = async () => {
    const response = await api.get('/coverLetters');
    return response.data;
};

export const getCoverLetterById = async (id) => {
    const response = await api.get(`/coverLetters/${id}`);
    return response.data;
};

export const createCoverLetter = async (payload) => {
    const response = await api.post('/coverLetters', payload);
    return response.data;
};

export const updateCoverLetter = async (id, payload) => {
    const response = await api.put(`/coverLetters/${id}`, payload);
    return response.data;
};

export const deleteCoverLetter = async (id) => {
    const response = await api.delete(`/coverLetters/${id}`);
    return response.data;
};
