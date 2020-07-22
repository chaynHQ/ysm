import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';

describe('Profile Controller', () => {
  let controller: ProfileController;
  let authGuard: DeepMocked<AuthGuard>;
  let profileService: DeepMocked<ProfileService>;

  beforeEach(async () => {
    authGuard = createMock<AuthGuard>();
    profileService = createMock<ProfileService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: profileService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return the profile', () => {
      const profile: Profile = {
        id: 'foo',
        favorites: [],
      };

      profileService.get.mockReturnValueOnce(profile);

      expect(controller.get('foo')).toEqual(profile);

      expect(profileService.get).toHaveBeenCalledWith('foo');
    });
  });
});
