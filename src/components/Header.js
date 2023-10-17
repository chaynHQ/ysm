import {
  Box,

  Divider,
  Drawer,
  Icon,
  IconButton,
  makeStyles,

  SvgIcon,
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
import leaveSite from '../shared/leave';
import BreatheTimer from './BreatheTimer';

const useStyles = makeStyles({
  headerIcon: {
    width: 40,
    height: 40,
  },
  title: {
    paddingLeft: 4,
    marginBottom: 0,
  },
  homepageLink: {
    marginBottom: 0,
  },
});

const Header = ({ menuContainer }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box
      bgcolor="primary.light"
    >
      <Box width={1} display="flex" justifyContent="space-between">
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
            <LinkUi component="a" underline="none" color="inherit" className={classes.homepageLink}>
              <Box display="flex" alignItems="center">
                <img
                  className={classes.headerIcon}
                  src="/logo-with-text.png"
                  alt="YSM Logo"
                />
              </Box>
            </LinkUi>
          </Link>
        </Box>
        <Box p={2}>
          <IconButton onClick={() => { setModalOpen(true); }}>
            <SvgIcon component={BreathIcon} />
          </IconButton>

        </Box>
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
          p={2}
        >
          <img
            className={classes.headerIcon}
            src="/logo-with-text.png"
            alt="YSM Logo"
          />
          <IconButton onClick={() => { setDrawerOpen(false); }}>
            <Clear />
          </IconButton>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" justifyContent="space-between" height={1} pb={2} pr={2}>
          <Box>
            <Link href="/" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <Home color="primary" />
                  </Icon>
                  Home
                </Box>
              </LinkUi>
            </Link>
            <Link href="/info/about-us" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <Info color="primary" />
                  </Icon>
                  About Us
                </Box>
              </LinkUi>
            </Link>

            <Link href={user ? '/settings' : '/sign-in'} passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <AccountCircle color="primary" />
                  </Icon>
                  {user ? 'My account' : 'Sign Up/Sign In'}
                </Box>
              </LinkUi>
            </Link>
            <LinkUi component="a" color="inherit" onClick={() => { leaveSite(); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <ExitToApp color="primary" />
                </Icon>
                Leave this site
              </Box>
            </LinkUi>
          </Box>
          <Box>
            <Link href="https://chayn.notion.site/Privacy-policy-ad4a447bc1aa4d7294d9af5f8be7ae43" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <MenuBook color="primary" />
                  </Icon>
                  Your Privacy
                </Box>
              </LinkUi>
            </Link>

            <Link href="/info/terms-and-conditions" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <Description color="primary" />
                  </Icon>
                  Terms & Conditions
                </Box>
              </LinkUi>
            </Link>
            <Link href="/info/cookies" passHref>
              <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
                <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                  <Icon>
                    <EmojiFoodBeverage color="primary" />
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
  menuContainer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Header;
