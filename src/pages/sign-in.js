import { Box } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const SignUpWidget = dynamic(
  () => import('../components/SignUpWidget'),
  { ssr: false },
);

const SignIn = () => {
  const router = useRouter();
  const { redirectUrl } = router.query;

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <SignUpWidget redirectUrl={redirectUrl} />
    </Box>
  );
};

export default SignIn;
