import { FirebaseAuth } from '../../src/firebase/firebase.types';

export async function deleteUser(auth: FirebaseAuth, uid: string): Promise<void> {
  return auth.deleteUser(uid);
}
