import {
  Box, Button, Dialog, DialogContent, DialogTitle, Divider, Drawer, Icon, IconButton, makeStyles, SvgIcon, Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import {
  AccountCircle, Clear, ExitToApp, Home, Info, Menu, MenuBook,
} from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import BreatheIcon from '../../public/breathe.svg';
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
  breathingExercise: {
    borderRadius: 4,
    width: '100%',
    maxWidth: 360,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1.33em',
    letterSpacing: 1,
  // -webkit-animation: 'bgcolor 10s infinite ease-in-out',
  // animation: 'bgcolor 10s infinite ease-in-out',
  // -webkit-animation-play-state: 'paused',
  // animationPlayState: 'paused',
  },
  breath: {
    width: 260,
    height: 260,
    margin: 10,
    padding: 10,
    backgroundColor: '#d5ecf4',
    borderRadius: '50%',
    boxSizing: 'border - box',
  // -webkit-animation: 'bgcolor2 10s infinite ease-in-out',
  // animation: 'bgcolor2 10s infinite ease-in-out',
  },
  breathContent: {
    width: 240,
    height: 240,
    margin: '0 auto',
    backgroundColor: '#eeb15c',
    borderRadius: '50%',
  // -webkit-transform: 'scale(0.1)',
  // transform: 'scale(0.1)',
  // -webkit-animation: 'scale 10s infinite ease-in-out',
  // animation: 'scale 10s infinite ease-in-out',
  // -webkit-animation-play-state: 'paused',
  // animationPlayState: 'paused',
  // -webkit-transform-origin: '50% 50%',
  // transformOrigin: '50% 50%',
  },
// @-webkit-keyframes scale: {
//   50% {
//     backgroundColor: '#eda644',
//     -webkit-transform: 'scale(1)',
//   }
// },
// @keyframes scale: {
//   50% {
//     backgroundColor: '#eda644',
//     transform: 'scale(1)',
//   }
// },
// @-webkit-keyframes bgcolor: {
//   50% {
//     backgroundColor: '#d4e4f4',
//   }
// },
// @keyframes bgcolor: {
//   50% {
//     backgroundColor: '#d4e4f4',
//   }
// },
// @-webkit-keyframes bgcolor2: {
//   50% {
//     backgroundColor:' #c3def4',
//   }
// },
// @keyframes bgcolor2: {
//   50% {
//     backgroundColor: '#c3def4',
//   }
// }
});

const Header = ({ menuContainer, isSignedin }) => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const message = 'Get comfortable and start breathing when ready';
  let timerMessage = 'Breathe Out';

  const toggleTimerMessage = () => {
    if (timerMessage === 'Breathe In') {
      timerMessage = 'Breathe Out';
    } else {
      timerMessage = 'Breathe In';
    }
  };

  const startTimer = () => {
    toggleTimerMessage();
    setTimerRunning(true);
  };
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
        <IconButton onClick={() => { setModalOpen(true); }}>
          <SvgIcon component={BreatheIcon} />
        </IconButton>

      </Box>

      <Dialog
        open={modalOpen}
        onClose={() => { setModalOpen(false); }}
      >
        <DialogTitle disableTypography>
          <Box display="flex" justifyContent="center" width={1}>
            <Typography variant="h1">Take a break</Typography>
            <IconButton alignSelf="flex-start" onClick={() => { setModalOpen(false); }}>
              <Clear />
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
            <Typography align="center">{message}</Typography>

            <Box class={classes.breath}>
              {/* <Box ref="breathContent" className={classes.breathContent} /> */}
              <Box className={classes.breathContent} />
            </Box>

            <Box
              mt={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
            >
              {timerRunning ? <Typography>{timerMessage}</Typography>
                : <Button onClick={() => { startTimer(); }}>Start</Button> }

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

          <Link href={isSignedin ? '/settings' : '/sign-in'} passHref>
            <LinkUi component="a" color="inherit" onClick={() => { setDrawerOpen(false); }}>
              <Box display="flex" alignItems="flex-end" pl={2} py={1}>
                <Icon>
                  <AccountCircle />
                </Icon>
                {isSignedin ? 'My account' : 'Sign Up'}
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
  isSignedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSignedin: state.user ? Object.keys(state.user) > 0 : false,
});

export default connect(mapStateToProps, null)(Header);
