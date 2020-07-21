import React, { ReactElement } from 'react';

import { makeStyles, Box, IconButton } from '@material-ui/core';
import { ExitToApp, VpnKey, Favorite, Explore } from '@material-ui/icons';

import icon from '../assets/logo.png';

const useStyles = makeStyles({
  logo: {
    height: '1.5em',
    width: '1.5em',
  },
  container: {
    minHeight: 32,
  },
});

type FooterProps = {
  logo?: boolean;
  loginLeft?: boolean;
  leave?: boolean;
  loginRight?: boolean;
  favourite?: boolean;
  directory?: boolean;
};

const Footer: React.FC<FooterProps> = ({
  logo,
  loginLeft,
  loginRight,
  leave,
  favourite,
  directory,
}: FooterProps): ReactElement => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      width={1}
      justifyContent="space-between"
      bgcolor="secondary.main"
      className={classes.container}
    >
      <Box display="flex" alignItems="center" paddingLeft={1}>
        <Box display={logo ? 'block' : 'none'}>
          <img src={icon} alt="Your story matters logo" className={classes.logo} />
        </Box>
        <Box display={loginLeft ? 'block' : 'none'}>
          <IconButton>
            <VpnKey color="primary" />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Box display={loginRight ? 'block' : 'none'}>
          <IconButton>
            <VpnKey color="primary" />
          </IconButton>
        </Box>
        <Box display={favourite ? 'block' : 'none'}>
          <IconButton color="primary">
            <Favorite />
          </IconButton>
        </Box>
        <Box display={directory ? 'block' : 'none'}>
          <IconButton color="primary">
            <Explore />
          </IconButton>
        </Box>
        <Box display={leave ? 'block' : 'none'}>
          <IconButton color="primary">
            <ExitToApp />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
