import { Module } from '@nestjs/common';
import { ThemeSerialiserService } from './theme-serialiser.service';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

@Module({
  controllers: [ThemesController],
  providers: [ThemesService, ThemeSerialiserService],
})
export class ThemesModule {}
