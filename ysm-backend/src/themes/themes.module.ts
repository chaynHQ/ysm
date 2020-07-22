import { Module } from '@nestjs/common';
import { StoryblokModule } from '../storyblok/storyblok.module';
import { ThemeSerialiserService } from './theme-serialiser.service';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

@Module({
  imports: [StoryblokModule],
  controllers: [ThemesController],
  providers: [ThemesService, ThemeSerialiserService],
})
export class ThemesModule {}
