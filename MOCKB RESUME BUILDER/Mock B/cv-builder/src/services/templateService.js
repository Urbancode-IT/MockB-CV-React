import api from '../api';

export const getTemplates = async () => {
    const response = await api.get('/templates');
    return response.data;
};

export const getTemplateBySlug = async (slug) => {
    const response = await api.get(`/templates/${slug}`);
    return response.data;
};
