import api from '../api';

export const getResumes = async () => {
    const response = await api.get('/resumes');
    return response.data;
};

export const getResumeById = async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
};

export const createResume = async (payload) => {
    const response = await api.post('/resumes', payload);
    return response.data;
};

export const updateResume = async (id, payload) => {
    const response = await api.put(`/resumes/${id}`, payload);
    return response.data;
};

export const deleteResume = async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
};
