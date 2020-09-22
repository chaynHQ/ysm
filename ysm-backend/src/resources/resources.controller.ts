import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PreviewMode } from '../preview-mode/preview-mode.decorator';
import { PreviewModeGuard } from '../preview-mode/preview-mode.guard';
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
  @UseGuards(PreviewModeGuard)
  async list(
    @Query('filters') filters: Record<string, string>,
    @Query('q') searchQuery: string,
    @PreviewMode() previewMode: boolean,
  ): Promise<Resource[]> {
    return this.resourcesService.list(filters, searchQuery, previewMode);
  }

  @Get(':slug')
  @UseGuards(PreviewModeGuard)
  async get(@Param('slug') slug: string, @PreviewMode() previewMode: boolean): Promise<Resource> {
    return this.resourcesService.get(slug, previewMode);
  }
}
