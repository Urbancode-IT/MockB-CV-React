import api from '../api';

export const generateResume = async (payload) => {
    const response = await api.post('/ai/generate-resume', payload);
    return response.data;
};

export const checkATS = async (payload) => {
    const response = await api.post('/ai/check-ats', payload);
    return response.data;
};

export const generateCoverLetter = async (payload) => {
    const response = await api.post('/ai/generate-cover-letter', payload);
    return response.data;
};
