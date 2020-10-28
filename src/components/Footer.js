import { BottomNavigation, BottomNavigationAction, Box } from '@material-ui/core';
import {
  Bookmark, ExitToApp, ImportContacts, LocationOn,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Footer = () => {
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
          if (value === '/leave') {
            window.open('http://www.wikipedia.org/', '_newtab');
            window.location.replace(
              'https://www.google.com/search?tbm=isch&q=cute+baby+animal+memes',
            );
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
