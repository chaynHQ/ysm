import React, { ReactElement } from 'react';

import { Button, makeStyles, Grid, Typography, Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import logo from '../assets/logo.png';
import illustration from '../assets/homepage-illustration.png';
import backgroundImage from '../assets/background.png';

const useStyles = makeStyles({
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${backgroundImage})`,
  },
});

const Home: React.FC = (): ReactElement => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true,
  });

  return (
    <Box display="flex" flexDirection="column" height={1} className={classes.container}>
      <Header menu={true} />
      <Box flexGrow={1}>
        <Grid
          container
          justify="space-between"
          direction="column"
          alignItems="center"
        >
          <img src={logo} alt="Your story matters logo" width={isMobile ? '25%' : '15%'} />
          <img
            src={illustration}
            alt="Illustration of woman writing in a journal"
            width={isMobile ? '85%' : '50%'}
          />
          <Typography align="center">
            If you&apos;ve been treated in a way that has made you feel uncomfortable or violated,
            let YSM be your companion because your story matters.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/overview">
            START
          </Button>
          <Typography align="center" variant="subtitle2" color="textSecondary">
            If you&apos;re in crisis click here.
          </Typography>
        </Grid>
      </Box>
      <Footer loginLeft={true} leave={true} />
    </Box>
  );
};

export default Home;
