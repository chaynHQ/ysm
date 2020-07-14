import React from 'react';

import {makeStyles, Box, useMediaQuery, IconButton} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Menu } from '@material-ui/icons';

import backgroundImage from '../assets/background.png'


const useStyles = makeStyles({
    container: {
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  });


function  Header(){
  const theme = useTheme();

  return (
    <Box display="flex" alignContent="flex-start" width={1}>
        <IconButton>
        <Menu/>
        </IconButton>
    </Box>
  )
};

export default Header;