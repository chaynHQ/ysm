import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { themesListFixture } from '../../test/fixtures/themes';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

describe('Themes Controller', () => {
  let controller: ThemesController;
  let themesService: DeepMocked<ThemesService>;

  beforeEach(async () => {
    themesService = createMock<ThemesService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [{ provide: ThemesService, useValue: themesService }],
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Themes', async () => {
      themesService.list.mockResolvedValueOnce(themesListFixture);

      expect(await controller.list()).toBe(themesListFixture);
    });
  });
});
