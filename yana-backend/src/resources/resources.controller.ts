import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilterOptions } from './filters.types';
import { Resource } from './resource.types';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Get('filters')
  async filters(): Promise<FilterOptions[]> {
    return this.resourcesService.filterOptions();
  }

  @Get()
  async list(@Query('filters') filters: Record<string, string>): Promise<Resource[]> {
    return this.resourcesService.list(filters);
  }

  @Get(':slug')
  async get(@Param('slug') slug: string): Promise<Resource> {
    return this.resourcesService.get(slug);
  }
}
