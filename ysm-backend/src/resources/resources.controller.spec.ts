import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { resourcesListFixture, singleResourceFixture } from '../../test/fixtures/resources';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

describe('Resources Controller', () => {
  let controller: ResourcesController;
  let resourcesService: DeepMocked<ResourcesService>;

  beforeEach(async () => {
    resourcesService = createMock<ResourcesService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [{ provide: ResourcesService, useValue: resourcesService }],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Resources', async () => {
      resourcesService.list.mockResolvedValueOnce(resourcesListFixture);

      expect(await controller.list(undefined, undefined)).toBe(resourcesListFixture);
    });
  });

  describe('get', () => {
    it('should return a single Resource', async () => {
      resourcesService.get.mockResolvedValueOnce(singleResourceFixture);

      expect(await controller.get('foo')).toBe(singleResourceFixture);

      expect(resourcesService.get).toHaveBeenCalledWith('foo');
    });
  });
});
