import { Box, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import { axiosGet } from '../store/axios';

const isBrowser = typeof window !== 'undefined';

const PreviewMode = () => {
  // ACTUALLY GET THIS FROM THE REACT STATE
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const loggedIn = (user && Object.keys(user).length > 0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loggedIn) {
      router.push('/sign-in?redirectUrl=preview-mode', '/sign-in');
    }
  }, []);

  return (
    <Box p={4} display="flex" flexDirection="row">
      {loggedIn
        ? (
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <Typography variant="h1">Toggle Preview Mode</Typography>
              <Box pl={2}>
                <Checkbox
                  checked={checked}
                  onChange={async () => {
                    if (!checked) {
                      const res = await axiosGet('/preview', {
                        params: {
                          token: user.xa,
                        },
                      });
                      setMessage(res.message);
                      if (res.allowed) {
                        setChecked(!checked);
                      // And set it in redux state
                      }
                    } else {
                    // Remove preview mode
                    }
                  }}
                />
              </Box>

            </Box>
            <Typography>{message}</Typography>
          </Box>
        )
        : null}
    </Box>
  );
};

export default PreviewMode;
