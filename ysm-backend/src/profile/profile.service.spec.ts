import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuth, FirebaseServices, Firestore } from 'src/firebase/firebase.types';
import { FIREBASE } from '../firebase/firebase-factory';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let mockFirebaseServices: FirebaseServices;

  let service: ProfileService;

  beforeEach(async () => {
    mockFirebaseServices = {
      auth: createMock<FirebaseAuth>(),
      firestore: createMock<Firestore>(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: FIREBASE,
          useValue: mockFirebaseServices,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
