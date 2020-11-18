import {
  Avatar, Box, Button, makeStyles, Typography,
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
  image: {
    width: '100%',
    height: 'auto',
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <Box
      p={4}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box pt={2} pb={4} width="40%" display="flex" justifyContent="center">
          <Avatar
            variant="square"
            className={classes.image}
            alt="Illustration of woman and a butterfly"
            src="/home-illustration.png"
          />
        </Box>
        <Typography variant="h1" align="center">Your Story Matters</Typography>
        <Typography align="center" color="textSecondary">
          If you&apos;ve been treated in a way that has made you feel uncomfortable or violated,
          let YSM be your companion because your story matters.
        </Typography>

        <Box py={2}>
          <Link href="/your-journey">
            <Button variant="contained" component="a" color="primary">
              Start your journey
            </Button>
          </Link>
        </Box>

        <Box width="50%">
          <Typography align="center" variant="subtitle2">
            If you&apos;re in crisis call the emergency services in your area.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
