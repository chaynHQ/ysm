import { DecodedIdToken } from 'src/firebase/firebase.types';

function buildDecodedToken(): DecodedIdToken {
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

export const unverifiedDecodedTokenFixture: DecodedIdToken = {
  ...buildDecodedToken(),
  email_verified: false,
};

export const verifiedDecodedTokenFixture: DecodedIdToken = {
  ...buildDecodedToken(),
  email_verified: true,
};
