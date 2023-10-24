import firebase from '../config/firebase';

export default function analyticsEvent(event, params) {
  if (process.env.NEXT_PUBLIC_ENV === 'live') {
    firebase.analytics().logEvent(event, params);
  }
}
