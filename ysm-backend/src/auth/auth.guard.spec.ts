import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  unverifiedDecodedTokenFixture,
  verifiedDecodedTokenFixture,
} from '../../test/fixtures/auth';
import { CURRENT_USER_ID_FIELD } from '../constants';
import { FIREBASE } from '../firebase/firebase-factory';
import { FirebaseAuth, FirebaseServices, Firestore } from '../firebase/firebase.types';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

function mockAuthHeader(mock: DeepMocked<ExecutionContext>, value: string): void {
  mock.switchToHttp().getRequest.mockReturnValue({
    headers: {
      authorization: value,
    },
  });
}

// Note: this is more of an integration test as we want to test the internals of the AuthService as well.

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let mockFirebaseAuth: DeepMocked<FirebaseAuth>;
  let mockFirebaseServices: FirebaseServices;
  let mockContext: DeepMocked<ExecutionContext>;

  beforeEach(async () => {
    mockFirebaseAuth = createMock<FirebaseAuth>();
    mockFirebaseServices = {
      auth: mockFirebaseAuth,
      firestore: createMock<Firestore>(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      shutdown: async () => {},
    };

    mockContext = createMock<ExecutionContext>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: FIREBASE,
          useValue: mockFirebaseServices,
        },
      ],
    }).compile();

    const authService = module.get<AuthService>(AuthService);

    guard = new AuthGuard(authService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('No auth header', () => {
    it("throws an UnauthorizedException with the appropriate error message and doesn't set the current user ID", async () => {
      mockAuthHeader(mockContext, null);

      expect.assertions(2);

      await expect(guard.canActivate(mockContext)).rejects.toEqual(
        new UnauthorizedException('Unauthorized: missing required Authorization token'),
      );

      expect(mockContext.switchToHttp().getRequest()[CURRENT_USER_ID_FIELD]).toBeUndefined();
    });
  });

  describe('Auth header in the wrong format', () => {
    it("throws an UnauthorizedException with the appropriate error message and doesn't set the current user ID", async () => {
      mockAuthHeader(mockContext, 'WRONG FORMAT');

      expect.assertions(2);

      await expect(guard.canActivate(mockContext)).rejects.toEqual(
        new UnauthorizedException(
          'Unauthorized: auth header not in the required format - should be "Bearer {token}"',
        ),
      );

      expect(mockContext.switchToHttp().getRequest()[CURRENT_USER_ID_FIELD]).toBeUndefined();
    });
  });

  describe('Auth header that fails verification', () => {
    it("throws an UnauthorizedException with the appropriate error message and doesn't set the current user ID", async () => {
      const token = 'foo';
      mockAuthHeader(mockContext, `Bearer ${token}`);

      mockFirebaseAuth.verifyIdToken.mockRejectedValueOnce(new Error('oops'));

      expect.assertions(3);

      await expect(guard.canActivate(mockContext)).rejects.toEqual(
        new UnauthorizedException('Unauthorized: token is expired or invalid'),
      );

      expect(mockFirebaseAuth.verifyIdToken).toHaveBeenCalledWith(token, true);

      expect(mockContext.switchToHttp().getRequest()[CURRENT_USER_ID_FIELD]).toBeUndefined();
    });
  });

  describe('Auth header with valid token', () => {
    describe('but email is not verified', () => {
      it("throws a ForbiddenException with the appropriate error message and doesn't set the current user ID", async () => {
        const token = 'foo';
        mockAuthHeader(mockContext, `Bearer ${token}`);

        mockFirebaseAuth.verifyIdToken.mockResolvedValueOnce(unverifiedDecodedTokenFixture);

        expect.assertions(3);

        await expect(guard.canActivate(mockContext)).rejects.toEqual(
          new ForbiddenException('Forbidden: user email not verified'),
        );

        expect(mockFirebaseAuth.verifyIdToken).toHaveBeenCalledWith(token, true);

        expect(mockContext.switchToHttp().getRequest()[CURRENT_USER_ID_FIELD]).toBeUndefined();
      });
    });

    describe('and email is verified', () => {
      it('should set the current user ID on the request and return true', async () => {
        const token = 'foo';
        mockAuthHeader(mockContext, `Bearer ${token}`);

        mockFirebaseAuth.verifyIdToken.mockResolvedValueOnce(verifiedDecodedTokenFixture);

        expect.assertions(3);

        await expect(guard.canActivate(mockContext)).resolves.toEqual(true);

        expect(mockFirebaseAuth.verifyIdToken).toHaveBeenCalledWith(token, true);

        expect(mockContext.switchToHttp().getRequest()[CURRENT_USER_ID_FIELD]).toEqual(
          verifiedDecodedTokenFixture.uid,
        );
      });
    });
  });
});
