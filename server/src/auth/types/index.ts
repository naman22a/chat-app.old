import { User } from '../../models/user.model';
import { OkResponse } from '../../types';

export interface UserResponse extends OkResponse {
    user: User;
}
