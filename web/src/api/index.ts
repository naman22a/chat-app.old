import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export * from './auth';
export * from './users';

export default API;
