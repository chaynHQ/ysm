import { Module } from '@nestjs/common';
import { StoryblokModule } from '../storyblok/storyblok.module';
import { PageSerialiserService } from './page-serialiser.service';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [StoryblokModule],
  controllers: [PagesController],
  providers: [PagesService, PageSerialiserService],
})
export class PagesModule {}
