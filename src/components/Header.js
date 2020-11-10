import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
  ExitToApp,
  Home,
  Info,
  Menu,
  MenuBook,
} from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactPlayer from 'react-player';
import BreathIcon from '../../public/breatheIcon.svg';
import firebase from '../config/firebase';
import isBrowser from '../shared/browserCheck';
import useWindowDimensions from '../shared/dimensions';
import leaveSite from '../shared/leave';

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    paddingLeft: 4,
    marginBottom: 0,
  },
  breathingExercise: {
    borderRadius: 4,
    width: '100%',
    maxWidth: 360,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1.33em',
    letterSpacing: 1,
  },
});

const Header = ({ menuContainer }) => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [breathTimerRunning, setBreathTimerRunning] = useState(false);
  const [breathState, setBreathState] = useState('');
  const [breathLoopCount, setBreathLoopCount] = useState(0);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const breatheTimerRef = useRef();

  const message = 'Get comfortable and start breathing when ready';

  const startTimer = () => {
    setBreathState('Breathe Out');
    setBreathTimerRunning(true);
  };

  const clearTimer = () => {
    setBreathTimerRunning(false);
    setBreathLoopCount(0);
    setBreathState('');
  };

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
        <img
          className={classes.icon}
          src="/logo.png"
          alt="YSM Logo"
        />
        <Typography className={classes.title}>Your Story Matters</Typography>
      </Box>
      <Box p={2}>
        <IconButton onClick={() => { setModalOpen(true); }}>
          <SvgIcon component={BreathIcon} />
        </IconButton>

      </Box>

      <Dialog
        open={modalOpen}
        onClose={() => { clearTimer(); setModalOpen(false); }}
      >
        <DialogTitle disableTypography>
          <Box display="flex" justifyContent="space-between" width={1}>
            <IconButton />
            <Typography variant="h1">Take a break</Typography>
            <IconButton onClick={() => { clearTimer(); setModalOpen(false); }}>
              <Clear id="BreathTimerClose" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography align="center">Feeling overwhelmed?</Typography>
          <Box
            className={classes.breathingExercise}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="space-between"
            bgcolor="primary.light"
          >
            <Typography align="center" color="secondary">{message}</Typography>

            <Box>
              <ReactPlayer
                ref={breatheTimerRef}
                url="/breathe.mp4"
                width="100%"
                playing={breathTimerRunning}
                onProgress={(e) => {
                  if (e.played > 0.5) {
                    setBreathState('Breathe In');
                  }
                }}
                onEnded={() => {
                  setBreathLoopCount(breathLoopCount + 1);
                  breatheTimerRef.current.seekTo(0);
                  if (breathLoopCount < 5) {
                    startTimer();
                  } else {
                    clearTimer();
                  }
                }}

              />
            </Box>

            <Box
              mt={3}
              display="flex"
              justifyContent="center"
            >
              {breathTimerRunning ? <Typography align="center">{breathState}</Typography>
                : <Button variant="contained" color="primary" size="small" onClick={() => { startTimer(); }}>Start</Button> }

            </Box>
          </Box>
        </DialogContent>
      </Dialog>

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
            <Clear id="MenuClose" />
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
      </Drawer>
    </Box>
  );
};

Header.propTypes = {
  menuContainer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
