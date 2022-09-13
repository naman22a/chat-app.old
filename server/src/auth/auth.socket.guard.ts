import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthSocketGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest() as Request;
        if (!req.session?.userId) {
            throw new WsException({
                ok: false,
                errors: [{ field: 'auth', message: 'Unauthorized' }],
            });
        }

        return true;
    }
}
