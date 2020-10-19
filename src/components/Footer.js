import { BottomNavigation, BottomNavigationAction, Box } from '@material-ui/core';
import {
  Bookmark, ExitToApp, ImportContacts, LocationOn,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../shared/dimensions';

const Footer = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();

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
        value={selected}
        onChange={(e, value) => {
          setSelected(value);
          router.push(value);
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
