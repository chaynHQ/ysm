import React from 'react';

import {
  Button, makeStyles, Grid, Typography, Box, Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import illustration from '../assets/homepage-illustration.png';

import useWindowDimensions from '../shared/dimensions';

const useStyles = makeStyles({
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  iconContainer: {
    backgroundColor: '#dadded',
    width: '100%',
    height: '100%',
  },
});

const Home = () => {
  const { width } = useWindowDimensions();
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" height={1} className={classes.container}>
      <Header menu />
      <Box m={4} flexGrow={1}>
        <Grid container justify="space-between" direction="column" alignItems="center">

          <Box width={width * 0.5} height={width * 0.5}>
            <Avatar className={classes.iconContainer} alt="Remy Sharp" src={illustration} />
          </Box>
          <Typography variant="h1" align="center">Your Story Matters</Typography>
          <Typography align="center">
            If you&apos;ve been treated in a way that has made you feel uncomfortable or violated,
            let YSM be your companion because your story matters.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/overview">
            Start your journey
          </Button>
          <Box width="50%">
            <Typography align="center" variant="subtitle2" color="textSecondary">
              If you&apos;re in crisis call the emergency services
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Footer loginLeft leave />
    </Box>
  );
};

export default Home;
