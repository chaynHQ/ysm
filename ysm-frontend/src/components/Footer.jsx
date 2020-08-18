import React, { useState, useEffect } from 'react';

import {
  BottomNavigationAction, BottomNavigation, Box,
} from '@material-ui/core';
import {
  ExitToApp, ImportContacts, LocationOn, Bookmark,
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import useWindowDimensions from '../shared/dimensions';

const Footer = () => {
  const { height } = useWindowDimensions();
  const location = useLocation();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    switch (location.pathname) {
      case '/overview':
        setSelected('journey');
        break;
      default:
        setSelected('');
    }
  });

  return (
    <Box top={height} position="sticky">
      <BottomNavigation
        showLabels
        value={selected}
        onChange={(e, value) => setSelected(value)}
      >
        <BottomNavigationAction
          value="journey"
          component={Link}
          to="/overview"
          label="Your Journey"
          icon={<ImportContacts />}
        />
        <BottomNavigationAction
          component={Link}
          to="/saved"
          label="Saved Items"
          value="Saved"
          icon={<Bookmark />}
        />
        <BottomNavigationAction
          component={Link}
          to="/directory"
          label="Find Support"
          value="Directory"
          icon={<LocationOn />}
        />
        <BottomNavigationAction
          component={Link}
          to="/leave"
          label="Leave Site"
          value="Leave"
          icon={<ExitToApp />}
        />
      </BottomNavigation>
    </Box>

  );
};

export default Footer;
