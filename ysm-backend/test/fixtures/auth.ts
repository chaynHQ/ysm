import { firebase } from 'src/firebase/firebase.types';

function buildDecodedToken(): firebase.auth.DecodedIdToken {
  const uid = 'User1223456';
  const authTime = new Date();

  return {
    iss: 'https://securetoken.google.com/project123456789',
    aud: 'project123456789',
    auth_time: Math.floor(authTime.getTime() / 1000),
    sub: uid,
    iat: Math.floor(authTime.getTime() / 1000),
    exp: Math.floor(authTime.getTime() / 1000 + 3600),
    firebase: {
      identities: {},
      sign_in_provider: 'custom',
    },
    uid,
  };
}

export const unverifiedDecodedTokenFixture: firebase.auth.DecodedIdToken = {
  ...buildDecodedToken(),
  email_verified: false,
};

export const verifiedDecodedTokenFixture: firebase.auth.DecodedIdToken = {
  ...buildDecodedToken(),
  email_verified: true,
};
