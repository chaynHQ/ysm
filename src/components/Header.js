import {
  Box,

  Divider,
  Drawer,
  Icon,
  IconButton,
  makeStyles,

  SvgIcon, Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import {
  AccountCircle,
  Clear,

  Description,

  EmojiFoodBeverage, ExitToApp,

  Home,
  Info,
  Menu,
  MenuBook,
} from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import BreathIcon from '../../public/breatheIcon.svg';
import firebase from '../config/firebase';
import isBrowser from '../shared/browserCheck';
import useWindowDimensions from '../shared/dimensions';
import leaveSite from '../shared/leave';
import BreatheTimer from './BreatheTimer';

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    paddingLeft: 4,
    marginBottom: 0,
  },
  link: {
    marginBottom: 0,
  },
});

const Header = ({ menuContainer }) => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="space-between"
      width={1}
      bgcolor="primary.light"
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
        <Link href="/" passHref>
          <LinkUi component="a" underline="none" color="inherit" className={classes.link}>
            <Box display="flex" alignItems="center">
              <img
                className={classes.icon}
                src="/logo.png"
                alt="YSM Logo"
              />
              <Typography className={classes.title}>Your Story Matters</Typography>
            </Box>
          </LinkUi>
        </Link>
      </Box>
      <Box p={2}>
        <IconButton onClick={() => { setModalOpen(true); }}>
          <SvgIcon component={BreathIcon} />
        </IconButton>

      </Box>

      <BreatheTimer modalOpen={modalOpen} setModalOpen={setModalOpen} />

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
          <Box display="flex" pr={2}>
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
        <Box display="flex" flexDirection="column" justifyContent="space-between" height={1} pb={2}>
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
            <Link href="/info/about-us" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <Info />
                  </Icon>
                  About Us
                </Box>
              </LinkUi>
            </Link>

            <Link href={user ? '/settings' : '/sign-in'} passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <AccountCircle />
                  </Icon>
                  {user ? 'My account' : 'Sign Up'}
                </Box>
              </LinkUi>
            </Link>
            <LinkUi component="a" color="inherit" onClick={() => { leaveSite(); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <ExitToApp />
                </Icon>
                Leave this site
              </Box>
            </LinkUi>
          </Box>
          <Box>
            <Link href="/info/privacy" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <MenuBook />
                  </Icon>
                  Your Privacy
                </Box>
              </LinkUi>
            </Link>

            <Link href="/info/terms-and-conditions" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <Description />
                  </Icon>
                  Terms and Conditions
                </Box>
              </LinkUi>
            </Link>
            <Link href="/info/cookies" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <EmojiFoodBeverage />
                  </Icon>
                  Cookie Policy
                </Box>
              </LinkUi>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

Header.propTypes = {
  menuContainer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
