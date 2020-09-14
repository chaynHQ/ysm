import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CURRENT_USER_ID_FIELD } from '../constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized: missing required Authorization token');
    }

    const decodedToken = await this.authService.parseAuth(authorization);

    request[CURRENT_USER_ID_FIELD] = decodedToken.uid;

    return true;
  }
}
