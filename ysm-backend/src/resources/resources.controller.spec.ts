import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { resourcesListFixture, singleResourceFixture } from '../../test/fixtures/resources';
import { PreviewModeGuard } from '../preview-mode/preview-mode.guard';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

describe('Resources Controller', () => {
  let controller: ResourcesController;
  let previewModeGuard: DeepMocked<PreviewModeGuard>;
  let resourcesService: DeepMocked<ResourcesService>;

  beforeEach(async () => {
    previewModeGuard = createMock<PreviewModeGuard>();
    resourcesService = createMock<ResourcesService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [{ provide: ResourcesService, useValue: resourcesService }],
    })
      .overrideGuard(PreviewModeGuard)
      .useValue(previewModeGuard)
      .compile();

    controller = module.get<ResourcesController>(ResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Resources', async () => {
      resourcesService.list.mockResolvedValueOnce(resourcesListFixture);

      expect(await controller.list(undefined, undefined, false)).toBe(resourcesListFixture);

      expect(resourcesService.list).toHaveBeenCalledWith(undefined, undefined, false);
    });
  });

  describe('get', () => {
    it('should return a single Resource', async () => {
      resourcesService.get.mockResolvedValueOnce(singleResourceFixture);

      expect(await controller.get('foo', false)).toBe(singleResourceFixture);

      expect(resourcesService.get).toHaveBeenCalledWith('foo', false);
    });
  });
});
