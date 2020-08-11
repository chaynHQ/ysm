import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE } from '../firebase/firebase-factory';
import { firebase, FirebaseServices } from '../firebase/firebase.types';
import { Profile } from './profile.types';

@Injectable()
export class ProfileService {
  constructor(@Inject(FIREBASE) private firebase: FirebaseServices) {}

  async get(id: string): Promise<Profile> {
    const doc = await this.profileDocRef(id).get();
    const data = doc.data();

    let bookmarkedResources = [];
    if (data) {
      bookmarkedResources = data.bookmarkedResources;
    }

    return {
      id,
      bookmarkedResources,
    };
  }

  async addBookmarkForResource(userId: string, resourceId: string): Promise<void> {
    const promise = this.profileDocRef(userId).set(
      {
        bookmarkedResources: firebase.firestore.FieldValue.arrayUnion(resourceId),
      },
      { merge: true },
    );
    return this.handleWrite(promise);
  }

  async removeBookmarkForResource(userId: string, resourceId: string): Promise<void> {
    const promise = this.profileDocRef(userId).set(
      {
        bookmarkedResources: firebase.firestore.FieldValue.arrayRemove(resourceId),
      },
      { merge: true },
    );
    return this.handleWrite(promise);
  }

  private profileDocRef(id: string): firebase.firestore.DocumentReference {
    return this.firebase.firestore.doc(`profiles/${id}`);
  }

  private async handleWrite(promise: Promise<firebase.firestore.WriteResult>): Promise<void> {
    await promise;

    // TODO: may want to consider logging the successful write operations in the future.

    return;
  }
}
