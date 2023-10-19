import firebase from '../config/firebase';

export default function analyticsEvent(event, params) {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    firebase.analytics().logEvent(event, params);
  }
}
