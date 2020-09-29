import React from 'react';
import { Box } from '@material-ui/core';

import dynamic from 'next/dynamic';

const SignUpWidget = dynamic(
  () => import('../components/SignUpWidget'),
  { ssr: false },
);

const SignIn = () => (
  <Box display="flex" flexDirection="column" height={1}>
    <SignUpWidget />
  </Box>
);

export default SignIn;
