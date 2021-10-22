import { auth } from './firebase-service';

export const authenticateUser = () => {
  return auth().signInAnonymously();
}
