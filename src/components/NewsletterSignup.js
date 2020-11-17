import {
  Box, Card, CardContent, Checkbox, Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import { axiosDelete, axiosGet, axiosPut } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import rollbar from '../shared/rollbar';

const NewsletterSignup = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      axiosGet('/newsletter', {
        params: {
          email: user.email,
        },
      }).then((res) => {
        if (res.status === 'subscribed') {
          setChecked(true);
        } else {
          setChecked(false);
        }
      });
    }
  }, []);

  return (
    <Box
      mx={5}
      mb={5}
    >
      <Card>
        <CardContent>
          <Typography align="center" variant="h2">YSM Newsletter</Typography>
          <Box display="flex">
            <Checkbox
              onChange={async () => {
                let res = {};
                if (checked) {
                  res = await axiosDelete('/newsletter', {
                    params: {
                      email: user.email,
                    },
                  });
                } else {
                  res = await axiosPut('/newsletter', {}, {
                    params: {
                      email: user.email,
                      displayName: user.displayName,
                    },
                  });
                }
                if (!res.error) {
                  setChecked(!checked);
                } else {
                  setError(true);
                  rollbar.error('Newsletter error', res.error);
                }
                if (router.pathname === '/sign-in') {
                  router.push('/');
                }
              }}
              checked={checked}
            />
            <Typography align="center"> I want to receive emails when new content is available on YSM.</Typography>

          </Box>
          {error
            ? <Typography align="center">Sorry, something went wrong! We&apos;ve been notified about this. Please try again later on or get in contact.</Typography>
            : null }
        </CardContent>
      </Card>

    </Box>
  );
};

export default NewsletterSignup;
