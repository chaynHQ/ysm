import { Box, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import { axiosGet } from '../store/axios';

const isBrowser = typeof window !== 'undefined';

const PreviewMode = () => {
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  if (Object.keys(user).length > 0) {
    return (
      <Box p={4} display="flex" flexDirection="row">
        <Typography variant="h1">Toggle Preview Mode</Typography>
        <Box pl={2}>
          <Checkbox
            checked={checked}
            onChange={async () => {
              if (!checked) {
                const enabled = await axiosGet('/preview');
                if (enabled) {
                  setChecked(!checked);
                  // And set it in redux state
                } else {
                  // Show appropriate error message
                }
              } else {
                // Remove preview mode
              }
            }}
          />
        </Box>
      </Box>
    );
  }
  router.push('/sign-in?redirectUrl=preview-mode', '/sign-in');
  return null;
};

export default PreviewMode;
