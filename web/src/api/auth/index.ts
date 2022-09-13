import axios from 'axios';
import API from '..';
import { OkResponse } from '../types';
import { LoginDto, RegisterDto } from './types';

export const register = async (data: RegisterDto): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/register', data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                errors: (error.response?.data as OkResponse).errors
            };
        }
        return {
            ok: false
        };
    }
};

export const login = async (data: LoginDto): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/login', data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                errors: (error.response?.data as OkResponse).errors
            };
        }
        return {
            ok: false
        };
    }
};

export const logout = async (): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/logout');
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                errors: (error.response?.data as OkResponse).errors
            };
        }
        return {
            ok: false
        };
    }
};
