/* eslint-disable*/ 
//TODO: Remove this disable

import React from 'react';

import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Menu, Search } from '@material-ui/icons';

import logo from '../assets/logo.png';

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20
  },
  title: {
    paddingLeft: 4,
    marginBottom: 0
  }
});

import useWindowDimensions from '../shared/dimensions';
  
const Header = () => {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();

  return (
    <Box
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="space-between"
      width={1}
      bgcolor={'#EFE9E5'}
      height={height*0.05}
    >
    <Box p={2}>
        <IconButton>
          <Menu />
        </IconButton>
        </Box>
      <Box 
        display="flex"
        alignItems="center"
        justifyContent="space-around">
        <img className={classes.icon} src={logo}/>
        <Typography className={classes.title} variant="subtitle1">Your Story Matters</Typography>
      </Box>
      <Box p={2}>
        <IconButton>
          <Search />
        </IconButton>
        </Box>
    </Box>
  );
};

export default Header;
