import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth.guard';
import { UsersService } from '../services/users.service';
import { UserResponse } from '../types';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async users() {
        return await this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Req() req: Request): Promise<UserResponse> {
        const user = await this.usersService.findOneById(req.session.userId);
        return {
            ok: true,
            user,
        };
    }
}
