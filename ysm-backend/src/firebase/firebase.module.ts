import { Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { FIREBASE, firebaseFactory } from './firebase-factory';
import { FirebaseServices } from './firebase.types';

@Module({
  providers: [firebaseFactory],
  exports: [FIREBASE],
})
export class FirebaseModule implements OnApplicationShutdown {
  constructor(@Inject('FIREBASE') private firebase: FirebaseServices) {}

  async onApplicationShutdown(): Promise<void> {
    this.firebase.shutdown();
  }
}
