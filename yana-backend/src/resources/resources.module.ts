import { Module } from '@nestjs/common';

import { ResourceSerialiserService } from './resource-serialiser.service';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  providers: [ResourcesService, ResourceSerialiserService],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
