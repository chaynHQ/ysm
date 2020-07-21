import React, { ReactElement } from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import backgroundImage from '../assets/background.png';

const useStyles = makeStyles({
  container: {
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const Overview: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Typography>Overview</Typography>
    </Grid>
  );
};

export default Overview;
