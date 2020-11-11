import { Box, makeStyles, Typography } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
  image: {
    width: '85%',
  },
});

export default function Custom404() {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={1}
      p={3}
    >
      <Typography variant="h1">Error 404</Typography>
      <img
        className={classes.image}
        src="/two-people-illustration.png"
        alt="Line drawing of two people sat down having a conversation."
      />
      <Typography align="center">Oh no!</Typography>
      <Typography align="center">Looks like there is a mistake!</Typography>
      <Typography align="center">
        Check your url bar or head back to the
        {' '}
        <Link href="/">
          <LinkUi color="inherit" underline="always">homepage</LinkUi>
        </Link>
        .
      </Typography>
    </Box>
  );
}
