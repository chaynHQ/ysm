import { Body, Controller, Delete, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUserId } from '../auth/current-user-id.decorator';
import { ProfileService } from './profile.service';
import { Profile, ResourceState } from './profile.types';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async get(@CurrentUserId() currentUserId: string): Promise<Profile> {
    return this.profileService.get(currentUserId);
  }

  @Put('terms/accept')
  @HttpCode(204)
  async acceptTerms(@CurrentUserId() currentUserId: string): Promise<void> {
    return this.profileService.acceptTerms(currentUserId);
  }

  @Put('terms/unaccept')
  @HttpCode(204)
  async unacceptTerms(@CurrentUserId() currentUserId: string): Promise<void> {
    return this.profileService.unacceptTerms(currentUserId);
  }

  @Put('bookmarks/resources/:resourceId')
  @HttpCode(204)
  async addBookmarkForResource(
    @CurrentUserId() currentUserId: string,
    @Param('resourceId') resourceId: string,
  ): Promise<void> {
    return this.profileService.addBookmarkForResource(currentUserId, resourceId);
  }

  @Delete('bookmarks/resources/:resourceId')
  @HttpCode(204)
  async removeBookmarkForResource(
    @CurrentUserId() currentUserId: string,
    @Param('resourceId') resourceId: string,
  ): Promise<void> {
    return this.profileService.removeBookmarkForResource(currentUserId, resourceId);
  }

  @Put('state/resources/:resourceId')
  @HttpCode(204)
  async updateResourceState(
    @CurrentUserId() currentUserId: string,
    @Param('resourceId') resourceId: string,
    @Body() state: ResourceState,
  ): Promise<void> {
    return this.profileService.updateResourceState(currentUserId, resourceId, state);
  }
}
