import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { resourcesListFixture, singleResourceFixture } from '../../test/fixtures/resources';
import { ResourceSerialiserService } from './resource-serialiser.service';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

describe('Resources Controller', () => {
  let controller: ResourcesController;
  let resourcesService: ResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [ConfigService, ResourceSerialiserService, ResourcesService],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
    resourcesService = module.get<ResourcesService>(ResourcesService);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Resources', async () => {
      const output = resourcesListFixture;

      jest.spyOn(resourcesService, 'list').mockResolvedValue(output);

      expect(await controller.list()).toBe(output);
    });
  });

  describe('get', () => {
    it('should returns a single Resource', async () => {
      const output = singleResourceFixture;

      jest.spyOn(resourcesService, 'get').mockResolvedValue(output);

      expect(await controller.get('foo')).toBe(output);
    });
  });
});
