import api from '../api';

export const getResumes = async () => {
    const response = await api.get('/resumes');
    return response.data;
};

export const getResumeById = async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
};

// payload: { title, template, data }
export const createResume = async (payload) => {
    const response = await api.post('/resumes', payload);
    return response.data;
};

// payload: { title?, template?, data? }
// Partial update — only sends what changed.
// Changing template alone never wipes data.
export const updateResume = async (id, payload) => {
    const response = await api.put(`/resumes/${id}`, payload);
    return response.data;
};

export const deleteResume = async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
};
