import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE } from '../firebase/firebase-factory';
import { FirebaseServices } from '../firebase/firebase.types';
import { Profile } from './profile.types';

@Injectable()
export class ProfileService {
  constructor(@Inject(FIREBASE) private firebase: FirebaseServices) {}

  get(id: string): Profile {
    return {
      id,
      favorites: [],
    };
  }
}
