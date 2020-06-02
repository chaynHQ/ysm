import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { ResourceSerialiserService } from './resource-serialiser.service';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  providers: [ResourcesService, ResourceSerialiserService, FiltersService],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
