import React from 'react';

import {makeStyles, Box, useMediaQuery, IconButton} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ExitToApp, VpnKey, Favorite, Explore } from '@material-ui/icons';

import logo from '../assets/logo.png';

//TODO: Dynamically show or don't show the icons
function  Footer(){
  return (
    <Box 
    display="flex" 
    width={1}
    justifyContent="space-between"
    >
    <Box>
        <img 
            src={logo}
            alt={'Your story matters logo'}
        />
        <IconButton>
        <VpnKey color="secondary"/>
        </IconButton>
    </Box>
    <Box>

    <IconButton>
        <VpnKey color="secondary"/>
            </IconButton>
        <IconButton color="secondary">
            <Favorite/>
        </IconButton>
        <IconButton color="secondary">
            <Explore/>
        </IconButton>
        <IconButton color="secondary">
            <ExitToApp/>
        </IconButton>

    </Box>
  </Box>
  )
};

export default Footer;