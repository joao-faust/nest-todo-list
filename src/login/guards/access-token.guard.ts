import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { TokenPayload } from 'src/login/login.types';
import { JWT_SECRET } from 'src/lib/env';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-access-token'];

    if (!token) throw new UnauthorizedException('Access token not provided');

    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      request.user = {
        id: payload.id,
        name: payload.name,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Access token invalid');
    }
  }
}
