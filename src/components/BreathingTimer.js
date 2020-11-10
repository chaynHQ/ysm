import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,

  IconButton,
  makeStyles,

  Typography,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const useStyles = makeStyles({

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

const BreathingTimer = ({ modalOpen, setModalOpen }) => {
  const classes = useStyles();
  const [breathTimerRunning, setBreathTimerRunning] = useState(false);
  const [breathState, setBreathState] = useState('');
  const [breathLoopCount, setBreathLoopCount] = useState(0);
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
  );
};

BreathingTimer.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default BreathingTimer;
