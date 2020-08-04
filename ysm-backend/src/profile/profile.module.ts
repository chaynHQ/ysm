import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [FirebaseModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
