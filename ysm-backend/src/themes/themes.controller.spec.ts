import { Test, TestingModule } from '@nestjs/testing';
import { themesListFixture } from '../../test/fixtures/themes';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

class ThemesServiceMock {
  async list() {
    return themesListFixture;
  }
}

describe('Themes Controller', () => {
  let controller: ThemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [{ provide: ThemesService, useClass: ThemesServiceMock }],
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Themes', async () => {
      expect(await controller.list()).toBe(themesListFixture);
    });
  });
});
