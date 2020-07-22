import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Box } from '@material-ui/core';

import Header from './Header';
import Footer from './Footer';

import {fetchResources} from '../actions'

const useStyles = makeStyles({
  container: {
    height: '100%',
  },
});

const Overview = (props: any) => {
  const classes = useStyles();
  props.fetchResources();

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Header menu search/>
      <Grid
        container
        justify="space-between"
        direction="column"
        alignItems="center"
        className={classes.container}
      >
        <Box>
          <Typography>“Quote to show we understand”</Typography>
          <Typography>Take a look at what we’ve got for you.</Typography>
        </Box>
        <Box>
          <Typography>Process what’s happened.</Typography>
          <Typography>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</Typography>
        </Box>
      </Grid>
      <Footer logo leave directory loginRight favourite/>
    </Box>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchResources: () => dispatch(fetchResources())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
