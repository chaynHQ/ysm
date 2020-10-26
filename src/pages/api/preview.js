import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebase';
import { axiosGet } from '../../store/axios';

const isBrowser = typeof window !== 'undefined';

export default async function handler(req, res) {
  // NOTE AT THE OMOMENT THIS ONLY CHECKS IF IT SHOULD BE TURNED ON
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  console.log('SETTING PREVIEW');

  const userAllowedCheck = await axiosGet('/profile',
    {
      headers: {
        'X-PREVIEW-MODE': 'preview',
        authorization: `Bearer ${user.xa}`,
      },
    });

  console.log(userAllowedCheck);
  // CHECK THAT IT IS THE RIGHT USER
  // if they are turn preview mode on
  // Set it in redux state &
  //   res.setPreviewData({});
  // Else send back an error message to be displayed
}

/// LOGIC

// IMPORTANT: now only published content will be returned by default, unless preview mode is "activated" by the frontend.
// Two key aspects control how and who gets to see draft content from Storyblok:
// 1. To signal that an API request should work in preview mode and attempt to fetch draft content, the client needs to set a new header in each API request: X-PREVIEW-MODE (value can be anything apart from a falsey value or the string 'false').
// 2. Only authenticated API requests (i.e. with the Firebase Auth token) will be allowed to do this, AND only certain users that have their email address present in the new env var CONTENT_EDITOR_EMAILS (which the backend safelists against).
// So if the preview header is set and, either no auth is provided or auth for a user that's not allowed is provided, then a 403 Forbidden is returned.
