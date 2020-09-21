import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box, IconButton, makeStyles, Typography, Drawer, Divider, Icon,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import {
  Menu, Search, Clear, Home, Info, MenuBook, AccountCircle, ExitToApp,
} from '@material-ui/icons';
import Link from 'next/link';

import useWindowDimensions from '../shared/dimensions';

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    paddingLeft: 4,
    marginBottom: 0,
  },
});

const Header = ({ menuContainer }) => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="space-between"
      width={1}
      bgcolor="#EFE9E5"
      height={height * 0.05}
    >
      <Box p={2}>
        <IconButton onClick={() => { setDrawerOpen(true); }}>
          <Menu />
        </IconButton>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <img
          className={classes.icon}
          src="/logo.png"
          alt="YSM Logo"
        />
        <Typography className={classes.title}>Your Story Matters</Typography>
      </Box>

      <Box p={2}>
        <Link href="/search" passHref>
          <IconButton component="a">
            <Search />
          </IconButton>
        </Link>
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); }}
        PaperProps={{ style: { position: 'absolute' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: menuContainer.current,
          style: { position: 'absolute' },
        }}
      >
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="space-between"
          height={height * 0.05}
          px={2}
        >
          <Box display="flex">
            {' '}
            <img
              className={classes.icon}
              src="/logo.png"
              alt="YSM Logo"
            />
            <Typography className={classes.title}>Your Story Matters</Typography>
          </Box>
          <IconButton onClick={() => { setDrawerOpen(false); }}>
            <Clear />
          </IconButton>
        </Box>
        <Divider />
        <Box>
          <Link href="/" passHref>
            <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <Home />
                </Icon>
                Home
              </Box>
            </LinkUi>
          </Link>
          <Link href="/about" passHref>
            <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <Info />
                </Icon>
                About Us
              </Box>
            </LinkUi>
          </Link>
          <Link href="/privacy" passHref>
            <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <MenuBook />
                </Icon>
                Your Privacy
              </Box>
            </LinkUi>
          </Link>

          {/* TODO: This needs to switch based on if someone is signed in or not */}
          <Link href="/settings" passHref>
            <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <AccountCircle />
                </Icon>
                My account
              </Box>
            </LinkUi>
          </Link>
          <Link href="/about" passHref>
            <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <ExitToApp />
                </Icon>
                Leave this site
              </Box>
            </LinkUi>
          </Link>
        </Box>
      </Drawer>
    </Box>
  );
};

Header.propTypes = {
  menuContainer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
