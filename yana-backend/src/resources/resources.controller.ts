import { Controller, Get, Param } from '@nestjs/common';

import { Resource } from './resource';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Get()
  async list(): Promise<Resource[]> {
    return this.resourcesService.list();
  }

  @Get(':slug')
  async get(@Param('slug') slug: string): Promise<Resource> {
    return this.resourcesService.get(slug);
  }
}
