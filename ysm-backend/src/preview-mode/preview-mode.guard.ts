import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { PREVIEW_MODE_FIELD, PREVIEW_MODE_HEADER_NAME } from '../constants';

@Injectable()
export class PreviewModeGuard implements CanActivate {
  private logger = new Logger('PreviewModeGuard');

  constructor(private configService: ConfigService, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { authorization, [PREVIEW_MODE_HEADER_NAME]: isPreviewMode } = request.headers;

    if (!isPreviewMode || isPreviewMode.toString().toLowerCase() === 'false') {
      return true;
    }

    if (!authorization) {
      this.logger.error('Tried to access preview mode without an auth token.');

      return false;
    }

    const decodedToken = await this.authService.parseAuth(authorization);

    const allowedEmails = this.configService.get<string[]>('contentEditorEmails');

    if (!allowedEmails.includes(decodedToken.email.toLowerCase())) {
      this.logger.error(
        `User ${decodedToken.uid} attempted to access preview mode but their email is not in the list of approved content editors.`,
      );

      return false;
    }

    request[PREVIEW_MODE_FIELD] = true;

    return true;
  }
}
