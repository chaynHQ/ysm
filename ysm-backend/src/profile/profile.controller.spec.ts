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
    it('should return the profile', async () => {
      const profile: Profile = {
        id: 'foo',
        bookmarkedResources: [],
      };

      profileService.get.mockResolvedValueOnce(profile);

      expect(await controller.get('foo')).toEqual(profile);

      expect(profileService.get).toHaveBeenCalledWith('foo');
    });
  });

  describe('addBookmarkForResource', () => {
    it('should call the profile service', async () => {
      profileService.addBookmarkForResource.mockResolvedValueOnce(undefined);

      expect(await controller.addBookmarkForResource('foo', '123456')).toEqual(undefined);

      expect(profileService.addBookmarkForResource).toHaveBeenCalledWith('foo', '123456');
    });
  });

  describe('removeBookmarkForResource', () => {
    it('should call the profile service', async () => {
      profileService.removeBookmarkForResource.mockResolvedValueOnce(undefined);

      expect(await controller.removeBookmarkForResource('foo', '123456')).toEqual(undefined);

      expect(profileService.removeBookmarkForResource).toHaveBeenCalledWith('foo', '123456');
    });
  });
});
