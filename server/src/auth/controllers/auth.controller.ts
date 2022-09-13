import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { UsersService } from '../services/users.service';
import * as argon2 from 'argon2';
import { OkResponse } from '../../types';
import { Request, Response } from 'express';
import { COOKIE_NAME } from '../../constants';
import { AuthGuard } from '../auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    async register(
        @Body() { username, password }: RegisterDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        // check if user exists
        const userExists = await this.usersService.findOneByUsername(username);
        if (userExists) {
            return {
                ok: false,
                errors: [
                    { field: 'username', message: 'username already taken' },
                ],
            };
        }

        // password hashing
        const hashedPassword = await argon2.hash(password);

        // save user to database
        const user = await this.usersService.create({
            username,
            password: hashedPassword,
        });

        // auth
        req.session.userId = user.id;

        return { ok: true };
    }

    @Post('login')
    async login(
        @Body() { username, password }: LoginDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        // user exists
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            return {
                ok: false,
                errors: [
                    {
                        field: 'username',
                        message: 'user not found',
                    },
                ],
            };
        }

        // match password
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return {
                ok: false,
                errors: [
                    {
                        field: 'password',
                        message: 'incorrect password',
                    },
                ],
            };
        }

        // auth
        req.session.userId = user.id;

        return {
            ok: true,
        };
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response): Promise<boolean> {
        return new Promise((resolve) =>
            req.session.destroy((error) => {
                if (error) {
                    resolve(false);
                    res.status(500).json({
                        ok: false,
                        errors: [
                            {
                                field: 'server',
                                message: 'Something went wrong',
                            },
                        ],
                    });
                } else {
                    res.clearCookie(COOKIE_NAME);
                    res.status(200).json({ ok: true });
                    resolve(true);
                }
            }),
        );
    }
}
