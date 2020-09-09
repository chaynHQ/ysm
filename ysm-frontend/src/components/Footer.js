import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  BottomNavigationAction, BottomNavigation, Box, Typography,
} from '@material-ui/core';
import {
  ExitToApp, ImportContacts, LocationOn, Bookmark,
} from '@material-ui/icons';

import useWindowDimensions from '../shared/dimensions';

const Footer = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();

  const [selected, setSelected] = useState('');

  useEffect(() => {
    switch (router.pathname) {
      case '/your-journey':
        setSelected('journey');
        break;
      default:
        setSelected('');
    }
  }, [router]);

  return (
    <Box height={height * 0.075}>
      <BottomNavigation
        showLabels
        value={selected}
        onChange={(e, value) => {
          setSelected(value)
          router.push(value)
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
            component="a"
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
