import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';
import { RegisterDto } from '../dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOneById(id: number) {
        return await this.userRepository.findOneBy({ id });
    }

    async findOneByUsername(username: string) {
        return await this.userRepository.findOneBy({ username });
    }

    async create(user: RegisterDto) {
        return await this.userRepository.create(user).save();
    }
}
