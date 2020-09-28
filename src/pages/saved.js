import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Box, makeStyles, Button,
} from '@material-ui/core';

import { fetchBookmarks } from '../store/actions';

const useStyles = makeStyles({

});

const Saved = ({ fetchBookmarksOnClick }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      className={classes.container}
      pt={3.5}
      px={2}
    >
      <Button onClick={() => { fetchBookmarksOnClick(); }}>
        Get Bookmarks
      </Button>

    </Box>
  );
};

Saved.propTypes = {
  fetchBookmarksOnClick: PropTypes.func.isRequired,
};

//   Saved.defaultProps = {

//   };

const mapDispatchToProps = (dispatch) => ({
  fetchBookmarksOnClick: () => dispatch(fetchBookmarks()),

});

export default connect(null, mapDispatchToProps)(Saved);
