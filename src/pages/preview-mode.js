import { Box, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';

const PreviewMode = ({ onLoadPreviewMode }) => {
  const router = useRouter();

  const [message, setMessage] = useState('');

  const [previewMode, setPreviewMode] = useState(onLoadPreviewMode);

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
                        setPreviewMode(true);
                      } else {
                        setPreviewMode(false);
                      }
                    } else {
                      const res = await axiosGet('/preview', {
                        params: {
                          revokeAccess: true,
                        },
                      });
                      setPreviewMode(false);
                      setMessage(res.message);
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

PreviewMode.propTypes = {
  onLoadPreviewMode: PropTypes.bool.isRequired,
};

export async function getStaticProps({ preview }) {
  return {
    props: { onLoadPreviewMode: preview || false },
  };
}

export default PreviewMode;
