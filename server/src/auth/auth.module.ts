import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [AuthController, UsersController],
})
export class AuthModule {}
