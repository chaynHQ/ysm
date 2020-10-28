import { Box, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../config/firebase';
import isBrowser from '../shared/browserCheck';
import { setPreviewMode } from '../store/actions';
import { axiosGet } from '../store/axios';

const PreviewMode = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
              <Typography variant="h1">Preview Mode</Typography>
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
                      const res = await axiosGet('/preview');
                      setMessage(res.message);
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
