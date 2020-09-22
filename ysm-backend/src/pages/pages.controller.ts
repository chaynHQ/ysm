import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PreviewMode } from '../preview-mode/preview-mode.decorator';
import { PreviewModeGuard } from '../preview-mode/preview-mode.guard';
import { PagesService } from './pages.service';
import { Page } from './pages.types';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get(':slug')
  @UseGuards(PreviewModeGuard)
  async get(@Param('slug') slug: string, @PreviewMode() previewMode: boolean): Promise<Page> {
    return this.pagesService.get(slug, previewMode);
  }
}
