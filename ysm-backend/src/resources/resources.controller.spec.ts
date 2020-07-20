import { Test, TestingModule } from '@nestjs/testing';
import { resourcesListFixture, singleResourceFixture } from '../../test/fixtures/resources';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

class ResourcesServiceMock {
  async list() {
    return resourcesListFixture;
  }

  async get() {
    return singleResourceFixture;
  }
}

describe('Resources Controller', () => {
  let controller: ResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [{ provide: ResourcesService, useClass: ResourcesServiceMock }],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Resources', async () => {
      expect(await controller.list(undefined, undefined)).toBe(resourcesListFixture);
    });
  });

  describe('get', () => {
    it('should return a single Resource', async () => {
      expect(await controller.get('foo')).toBe(singleResourceFixture);
    });
  });
});
