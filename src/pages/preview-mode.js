import { Box, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../config/firebase';
import { setPreviewMode } from '../store/actions';
import { axiosGet } from '../store/axios';

const isBrowser = typeof window !== 'undefined';

const PreviewMode = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ACTUALLY GET THIS FROM THE REACT STATE
  // const [checked, setChecked] = useState(false);
  const previewMode = useSelector((state) => state.user.previewMode || false);

  const [message, setMessage] = useState('');

  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const loggedIn = (user && Object.keys(user).length > 0);

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
                  checked={previewMode}
                  onChange={async () => {
                    if (!previewMode) {
                      const res = await axiosGet('/preview', {
                        params: {
                          token: user.xa,
                        },
                      });
                      setMessage(res.message);
                      if (res.allowed) {
                        dispatch(setPreviewMode(true));
                      } else {
                        dispatch(setPreviewMode(false));
                      }
                    } else {
                      dispatch(setPreviewMode(false));
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
