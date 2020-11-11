import { Box, makeStyles, Typography } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack } from '@material-ui/icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const SignUpWidget = dynamic(
  () => import('../components/SignUpWidget'),
  { ssr: false },
);

const SignIn = () => {
  const classes = useStyles();
  const router = useRouter();
  const { redirectUrl } = router.query;

  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3.5}
      px={2}
    >
      <Link href={redirectUrl || '/'} passHref>
        <LinkUi component="a" underline="always" color="inherit">
          <Box display="flex" alignItems="center">
            <ArrowBack className={classes.icon} />
            <Typography variant="body2">Back</Typography>
          </Box>
        </LinkUi>
      </Link>
      <SignUpWidget redirectUrl={redirectUrl} />
    </Box>
  );
};

export default SignIn;
