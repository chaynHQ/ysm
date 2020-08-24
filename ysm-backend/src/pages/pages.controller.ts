import { Controller, Get, Param } from '@nestjs/common';
import { PagesService } from './pages.service';
import { Page } from './pages.types';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get(':slug')
  async get(@Param('slug') slug: string): Promise<Page> {
    return this.pagesService.get(slug);
  }
}
