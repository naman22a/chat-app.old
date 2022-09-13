import { User } from '../api/users/types';

export interface Message {
    id: number;
    text: string;
    user: User;
    createdAt: string;
    updatedAt: string;
}
