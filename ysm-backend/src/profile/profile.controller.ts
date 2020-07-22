import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUserId } from '../auth/current-user-id.decorator';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  get(@CurrentUserId() currentUserId: string): Profile {
    return this.profileService.get(currentUserId);
  }
}
