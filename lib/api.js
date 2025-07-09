import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getListings = async (page = 1, limit = 10, status = '') => {
  try {
    const response = await api.get('/listings', {
      params: { page, limit, status }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export const updateListingStatus = async (id, status) => {
  try {
    const response = await api.put(`/listings/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating listing status:', error);
    throw error;
  }
};

export const updateListing = async (id, data) => {
  try {
    const response = await api.put(`/listings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

export const getAuditLogs = async () => {
  try {
    const response = await api.get('/audit');
    return response.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};