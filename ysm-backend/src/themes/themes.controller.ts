import { Controller, Get } from '@nestjs/common';
import { Theme } from './theme.types';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}

  @Get()
  async list(): Promise<Theme[]> {
    return this.themesService.list();
  }
}
