import api from '../api';

export const getPortfolios = async () => {
    const response = await api.get('/portfolios');
    return response.data;
};

export const getPortfolioById = async (id) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
};

export const createPortfolio = async (payload) => {
    const response = await api.post('/portfolios', payload);
    return response.data;
};

export const updatePortfolio = async (id, payload) => {
    const response = await api.put(`/portfolios/${id}`, payload);
    return response.data;
};

export const deletePortfolio = async (id) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
};
