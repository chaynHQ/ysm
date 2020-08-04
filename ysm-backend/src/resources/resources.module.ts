import { Module } from '@nestjs/common';
import { StoryblokModule } from '../storyblok/storyblok.module';
import { FiltersService } from './filters.service';
import { ResourceSerialiserService } from './resource-serialiser.service';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  imports: [StoryblokModule],
  providers: [ResourcesService, ResourceSerialiserService, FiltersService],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
