import { Box, makeStyles, Typography } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Rollbar from 'rollbar';

const useStyles = makeStyles({
  image: {
    width: '85%',
  },
});

function Error({ statusCode }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={1}
    >
      <Typography variant="h1">
        Error
        {' '}
        {statusCode}
      </Typography>
      <img
        className={classes.image}
        src="/error-illustration.png"
        alt="Line drawing of two people sat down having a conversation."
      />
      <Typography align="center">Oh no!</Typography>
      <Typography align="center">Looks like there is a mistake!</Typography>
      <Typography align="center">
        This has been reported to us and we are working on it. Head back to the
        {' '}
        <Link href="/">
          <LinkUi color="inherit" underline="always">homepage</LinkUi>
        </Link>
        {' '}
        for now.
      </Typography>
    </Box>
  );
}

Error.getInitialProps = ({ req, res, err }) => {
  let statusCode;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  } else {
    statusCode = 404;
  }

  const rollbarEnv = process.env.NEXT_PUBLIC_ROLLBAR_ENV;
  const rollbarToken = process.env.NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN;

  // Only require Rollbar and report error if we're on the server & it's not a local 404.
  if (!process.browser && statusCode !== 404) {
    const rollbar = new Rollbar({
      accessToken: rollbarToken,
      captureUncaught: true,
      captureUnhandledRejections: true,
      enabled: rollbarToken !== 'false',
      environment: rollbarEnv,
    });

    rollbar.error(err, req);
  }
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default Error;
