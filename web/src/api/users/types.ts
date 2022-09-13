import { OkResponse } from '../types';

export interface User {
    id: number;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse extends OkResponse {
    user: User | null;
}
