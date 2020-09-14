import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { themesListFixture } from '../../test/fixtures/themes';
import { PreviewModeGuard } from '../preview-mode/preview-mode.guard';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

describe('Themes Controller', () => {
  let controller: ThemesController;
  let previewModeGuard: DeepMocked<PreviewModeGuard>;
  let themesService: DeepMocked<ThemesService>;

  beforeEach(async () => {
    previewModeGuard = createMock<PreviewModeGuard>();
    themesService = createMock<ThemesService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [{ provide: ThemesService, useValue: themesService }],
    })
      .overrideGuard(PreviewModeGuard)
      .useValue(previewModeGuard)
      .compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of Themes', async () => {
      themesService.list.mockResolvedValueOnce(themesListFixture);

      expect(await controller.list(false)).toBe(themesListFixture);
    });
  });
});
