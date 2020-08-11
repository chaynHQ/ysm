import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { FIREBASE } from '../firebase/firebase-factory';
import { firebase, FirebaseServices } from '../firebase/firebase.types';
import { CURRENT_USER_ID_FIELD } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private CHECK_REVOKED = true;

  private logger = new Logger('AuthGuard');

  constructor(@Inject(FIREBASE) private firebase: FirebaseServices) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized: missing required Authorization token');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Unauthorized: auth header not in the required format - should be "Bearer {token}"',
      );
    }

    const idToken = authorization.split('Bearer ')[1];

    const decodedToken = await this.parseAndValidateToken(idToken);

    const userId = decodedToken.uid;

    if (!decodedToken.email_verified) {
      this.logger.error(
        `Unauthorized: user email not verified - user ID: ${userId}. Client should not be making requests with an unverified user.`,
      );

      throw new UnauthorizedException('Unauthorized: user email not verified');
    }

    request[CURRENT_USER_ID_FIELD] = userId;

    return true;
  }

  private async parseAndValidateToken(token: string): Promise<firebase.auth.DecodedIdToken> {
    try {
      const decodedToken = await this.firebase.auth.verifyIdToken(token, this.CHECK_REVOKED);

      return decodedToken;
    } catch (err) {
      this.logger.error(`Unauthorized: failed verification with error: ${err.message}`);

      throw new UnauthorizedException('Unauthorized: token is expired or invalid');
    }
  }
}
