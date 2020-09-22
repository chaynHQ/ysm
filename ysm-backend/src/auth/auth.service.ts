import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { FIREBASE } from '../firebase/firebase-factory';
import { firebase, FirebaseServices } from '../firebase/firebase.types';

@Injectable()
export class AuthService {
  private CHECK_REVOKED = true;

  private logger = new Logger('AuthService');

  constructor(@Inject(FIREBASE) private firebase: FirebaseServices) {}

  async parseAuth(header: string): Promise<firebase.auth.DecodedIdToken> {
    if (!header.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Unauthorized: auth header not in the required format - should be "Bearer {token}"',
      );
    }

    const idToken = header.split('Bearer ')[1];

    const decodedToken = await this.parseAndValidateToken(idToken);

    if (!decodedToken.email_verified) {
      this.logger.error(
        `Unauthorized: user email not verified - user ID: ${decodedToken.uid}. Client should not be making requests with an unverified user.`,
      );

      throw new ForbiddenException('Forbidden: user email not verified');
    }

    return decodedToken;
  }

  private async parseAndValidateToken(token: string): Promise<firebase.auth.DecodedIdToken> {
    try {
      const decodedToken = await this.firebase.auth.verifyIdToken(token, this.CHECK_REVOKED);

      return decodedToken;
    } catch (err) {
      this.logger.error(`Unauthorized: failed token verification with error: ${err.message}`);

      throw new UnauthorizedException('Unauthorized: token is expired or invalid');
    }
  }
}
