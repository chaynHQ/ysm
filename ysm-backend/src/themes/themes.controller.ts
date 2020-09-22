import { Controller, Get, UseGuards } from '@nestjs/common';
import { PreviewMode } from '../preview-mode/preview-mode.decorator';
import { PreviewModeGuard } from '../preview-mode/preview-mode.guard';
import { Theme } from './theme.types';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}

  @Get()
  @UseGuards(PreviewModeGuard)
  async list(@PreviewMode() previewMode: boolean): Promise<Theme[]> {
    return this.themesService.list(previewMode);
  }
}
