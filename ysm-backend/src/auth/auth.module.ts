import { Global, Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [FirebaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
