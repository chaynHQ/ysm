import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PreviewModeGuard } from '../preview-mode/preview-mode.guard';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Page } from './pages.types';

describe('Pages Controller', () => {
  let controller: PagesController;
  let previewModeGuard: DeepMocked<PreviewModeGuard>;
  let pagesService: DeepMocked<PagesService>;

  beforeEach(async () => {
    previewModeGuard = createMock<PreviewModeGuard>();
    pagesService = createMock<PagesService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [{ provide: PagesService, useValue: pagesService }],
    })
      .overrideGuard(PreviewModeGuard)
      .useValue(previewModeGuard)
      .compile();

    controller = module.get<PagesController>(PagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return a single Page', async () => {
      const pageMock = createMock<Page>();

      pagesService.get.mockResolvedValueOnce(pageMock);

      expect(await controller.get('foo', false)).toBe(pageMock);

      expect(pagesService.get).toHaveBeenCalledWith('foo', false);
    });
  });
});
