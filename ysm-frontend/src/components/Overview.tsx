import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Box, CircularProgress } from '@material-ui/core';

import Header from './Header';
import Footer from './Footer';

import {fetchThemes} from '../actions'

const useStyles = makeStyles({
  container: {
    height: '100%',
  },
});

function useTraceUpdate(props: any) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}


const Overview = (props: any) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  // Need all themes and then we can switch to loading = false
  // TODO: THIS IS OVERLOADING THINGS
  // TODO: USE RICH TEXT on the props.themes objects
  useEffect(() => {
    // 👍 We're not breaking the first rule anymore
    if (props.themes.length > 0){
      setLoading(false)
      console.log(props.themes)
    } else {
      props.fetchThemes();
    }
  });

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
        {loading ?
          <CircularProgress />
        :
        <Box>
        <Typography>Process what’s happened.</Typography>
        <Typography>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</Typography>
      </Box>
        }
      </Grid>
      <Footer logo leave directory loginRight favourite/>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  themes: state.themes
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchThemes: () => dispatch(fetchThemes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
