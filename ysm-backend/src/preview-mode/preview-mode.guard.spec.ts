import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { PREVIEW_MODE_FIELD, PREVIEW_MODE_HEADER_NAME } from '../constants';
import { firebase } from '../firebase/firebase.types';
import { PreviewModeGuard } from './preview-mode.guard';

function mockHeaders(
  mock: DeepMocked<ExecutionContext>,
  previewMode: string | undefined,
  authorization: string | undefined,
): void {
  mock.switchToHttp().getRequest.mockReturnValue({
    headers: {
      [PREVIEW_MODE_HEADER_NAME]: previewMode,
      authorization,
    },
  });
}

describe('PreviewModeGuard', () => {
  let guard: PreviewModeGuard;

  let configService: DeepMocked<ConfigService>;
  let authService: DeepMocked<AuthService>;

  let mockContext: DeepMocked<ExecutionContext>;

  beforeEach(async () => {
    configService = createMock<ConfigService>();
    authService = createMock<AuthService>();

    mockContext = createMock<ExecutionContext>();

    guard = new PreviewModeGuard(configService, authService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('No preview mode header', () => {
    it("allows access and doesn't set preview mode on the request", async () => {
      mockHeaders(mockContext, undefined, undefined);

      expect.assertions(3);

      await expect(guard.canActivate(mockContext)).resolves.toEqual(true);

      expect(authService.parseAuth).not.toHaveBeenCalled();

      expect(mockContext.switchToHttp().getRequest()[PREVIEW_MODE_FIELD]).toBeUndefined();
    });
  });

  describe('Preview mode header set', () => {
    describe("when it's value is 'false'", () => {
      it("allows access and doesn't set preview mode on the request", async () => {
        mockHeaders(mockContext, 'false', undefined);

        expect.assertions(3);

        await expect(guard.canActivate(mockContext)).resolves.toEqual(true);

        expect(authService.parseAuth).not.toHaveBeenCalled();

        expect(mockContext.switchToHttp().getRequest()[PREVIEW_MODE_FIELD]).toBeUndefined();
      });
    });

    describe("when it's value is 'true'", () => {
      describe('with no authorization header set', () => {
        it("doesn't allow access and doesn't set preview mode on the request", async () => {
          mockHeaders(mockContext, 'true', undefined);

          expect.assertions(3);

          await expect(guard.canActivate(mockContext)).resolves.toEqual(false);

          expect(authService.parseAuth).not.toHaveBeenCalled();

          expect(mockContext.switchToHttp().getRequest()[PREVIEW_MODE_FIELD]).toBeUndefined();
        });
      });

      describe('with a valid authorization header set', () => {
        const authorizationHeader = 'a valid token';
        let mockDecodedToken: firebase.auth.DecodedIdToken;
        let emailSpy: jest.Mock<string, []>;

        beforeEach(() => {
          mockDecodedToken = createMock<firebase.auth.DecodedIdToken>();

          Object.defineProperty(mockDecodedToken, 'uid', { value: '12345' });

          emailSpy = jest.fn(() => 'me@example.org');
          Object.defineProperty(mockDecodedToken, 'email', { get: emailSpy });
          authService.parseAuth.mockResolvedValueOnce(mockDecodedToken);
        });

        describe("when authed email isn't in list of allowed emails", () => {
          it("doesn't allow access and doesn't set preview mode on the request", async () => {
            mockHeaders(mockContext, 'true', authorizationHeader);

            configService.get.mockReturnValueOnce(['someone@example.org']);

            expect.assertions(6);

            await expect(guard.canActivate(mockContext)).resolves.toEqual(false);

            expect(configService.get).toHaveBeenCalledWith('contentEditorEmails');

            expect(authService.parseAuth).toHaveBeenCalledTimes(1);
            expect(authService.parseAuth).toHaveBeenCalledWith(authorizationHeader);
            expect(emailSpy).toHaveBeenCalledTimes(1);

            expect(mockContext.switchToHttp().getRequest()[PREVIEW_MODE_FIELD]).toBeUndefined();
          });
        });

        describe('when authed email is in list of allowed emails', () => {
          it('allows access and sets preview mode on the request', async () => {
            mockHeaders(mockContext, 'true', authorizationHeader);

            configService.get.mockReturnValueOnce(['me@example.org']);

            expect.assertions(6);

            await expect(guard.canActivate(mockContext)).resolves.toEqual(true);

            expect(configService.get).toHaveBeenCalledWith('contentEditorEmails');

            expect(authService.parseAuth).toHaveBeenCalledTimes(1);
            expect(authService.parseAuth).toHaveBeenCalledWith(authorizationHeader);
            expect(emailSpy).toHaveBeenCalledTimes(1);

            expect(mockContext.switchToHttp().getRequest()[PREVIEW_MODE_FIELD]).toEqual(true);
          });
        });
      });
    });
  });
});
