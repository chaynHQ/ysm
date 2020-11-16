import {
  Box, Button, makeStyles, Typography,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box p={3} display="flex" justifyContent="center">
        <img
          className={classes.image}
          alt="Illustration of woman and a butterfly"
          src="/home-illustration.png"
        />
      </Box>
      <Typography variant="h1" align="center">Your Story Matters</Typography>
      <Typography align="center">
        If you&apos;ve been treated in a way that has made you feel uncomfortable or violated,
        let YSM be your companion because your story matters.
      </Typography>

      <Link href="/your-journey">
        <Button variant="contained" component="a" color="primary">
          Start your journey
        </Button>
      </Link>

      <Box width="50%">
        <Typography align="center" variant="subtitle2" color="textSecondary">
          If you&apos;re in crisis call the emergency services in your area.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
