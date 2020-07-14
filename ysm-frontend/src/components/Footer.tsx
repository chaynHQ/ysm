import React from 'react';

import {makeStyles, Box, useMediaQuery, IconButton} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ExitToApp, VpnKey } from '@material-ui/icons';

import backgroundImage from '../assets/background.png'


const useStyles = makeStyles({
    container: {
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  });


function  Footer(){
  const theme = useTheme();

  return (
    <Box 
    display="flex" 
    width={1}
    justifyContent="space-between"
    >
    <IconButton>
      <VpnKey color="secondary"/>
    </IconButton>
    <IconButton color="secondary">
      <ExitToApp/>
    </IconButton>
  </Box>
  )
};

export default Footer;