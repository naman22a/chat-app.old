import axios from 'axios';
import API from '..';
import { OkResponse } from '../types';
import { UserResponse } from './types';

export const getUser = async (): Promise<UserResponse> => {
    try {
        const res = await API.get('/users/me');
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                user: null,
                errors: (error.response?.data as OkResponse).errors
            };
        }
        return {
            ok: false,
            user: null
        };
    }
};
