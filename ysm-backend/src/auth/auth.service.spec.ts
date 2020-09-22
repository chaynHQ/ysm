import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { FIREBASE } from '../firebase/firebase-factory';
import { FirebaseAuth, FirebaseServices, Firestore } from '../firebase/firebase.types';
import { AuthService } from './auth.service';

// Note: this service is tested more thoroughly as part of the AuthGuard specs.

describe('AuthService', () => {
  let mockFirebaseServices: FirebaseServices;

  let service: AuthService;

  beforeEach(async () => {
    mockFirebaseServices = {
      auth: createMock<FirebaseAuth>(),
      firestore: createMock<Firestore>(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      shutdown: async () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: FIREBASE,
          useValue: mockFirebaseServices,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
