import { Controller, Delete, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUserId } from '../auth/current-user-id.decorator';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async get(@CurrentUserId() currentUserId: string): Promise<Profile> {
    return this.profileService.get(currentUserId);
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
}
