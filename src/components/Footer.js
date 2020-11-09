import {
  BottomNavigation, BottomNavigationAction, Box, makeStyles,
} from '@material-ui/core';
import {
  Bookmark, ExitToApp, ImportContacts, LocationOn,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import leaveSite from '../shared/leave';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const Footer = () => {
  const router = useRouter();
  const classes = useStyles();

  const [selected, setSelected] = useState('');

  useEffect(() => {
    switch (router.pathname) {
      case '/your-journey':
        setSelected('/your-journey');
        break;
      case '/saved':
        setSelected('/saved');
        break;
      default:
        setSelected('');
    }
  }, [router]);

  return (
    <Box>
      <BottomNavigation
        showLabels
        className={classes.root}
        value={selected}
        onChange={(e, value) => {
          if (value === '/leave') {
            leaveSite();
          } else {
            setSelected(value);
            router.push(value);
          }
        }}
      >
        <BottomNavigationAction
          value="/your-journey"
          showLabel
          component="a"
          label="Your Journey"
          icon={<ImportContacts />}
        />
        <BottomNavigationAction
          label="Saved Items"
          showLabel
          component="a"
          value="/saved"
          icon={<Bookmark />}
        />
        <BottomNavigationAction
          component="a"
          showLabel
          label="Find Support"
          value="/directory"
          icon={<LocationOn />}
        />
        <BottomNavigationAction
          component="button"
          showLabel
          label="Leave Site"
          value="/leave"
          icon={<ExitToApp />}
        />
      </BottomNavigation>
    </Box>

  );
};

export default Footer;
