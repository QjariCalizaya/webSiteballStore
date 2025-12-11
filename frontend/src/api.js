import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = data => axios.post(`${API_URL}/auth/register`, data);
export const login = data => axios.post(`${API_URL}/auth/login`, data);
export const getProducts = () => axios.get(`${API_URL}/products`);
