import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  BottomNavigationAction, BottomNavigation, Box,
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
        onChange={(e, value) => setSelected(value)}
      >
        <Link href="/your-journey" passHref>
          <BottomNavigationAction
            value="journey"
            component="a"
            label="Your Journey"
            icon={<ImportContacts />}
          />
        </Link>
        <Link href="/saved" passHref>
          <BottomNavigationAction
            label="Saved Items"
            component="a"
            value="Saved"
            icon={<Bookmark />}
          />
        </Link>
        <Link href="/directory" passHref>
          <BottomNavigationAction
            component="a"
            label="Find Support"
            value="Directory"
            icon={<LocationOn />}
          />
        </Link>
        <Link href="/leave" passHref>
          <BottomNavigationAction
            component="a"
            label="Leave Site"
            value="Leave"
            icon={<ExitToApp />}
          />
        </Link>
      </BottomNavigation>
    </Box>

  );
};

export default Footer;
