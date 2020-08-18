import React from 'react';

import {
  BottomNavigationAction, BottomNavigation, Box,
} from '@material-ui/core';
import {
  ExitToApp, ImportContacts, LocationOn, Bookmark,
} from '@material-ui/icons';

import useWindowDimensions from '../shared/dimensions';

const Footer = () => {
  const { height } = useWindowDimensions();
  return (
    <Box top={height} position="sticky">
      <BottomNavigation
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
        showLabels
      >
        <BottomNavigationAction label="Your Journey" value="Journey" icon={<ImportContacts />} />
        <BottomNavigationAction label="Saved Items" value="Saved" icon={<Bookmark />} />
        <BottomNavigationAction label="Find Support" value="Directory" icon={<LocationOn />} />
        <BottomNavigationAction label="Leave Site" value="Leave" icon={<ExitToApp />} />
      </BottomNavigation>
    </Box>

  );
};

export default Footer;
