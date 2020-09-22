import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import {
  BookmarkBorder,
} from '@material-ui/icons';

import LinkUi from '@material-ui/core/Link';
import richTextHelper from '../shared/rich-text';
import SignUpPrompt from './SignUpPrompt';

const useStyles = makeStyles((theme) => ({
}));

const ResourceContents = ({ resource, theme }) => {
  const classes = useStyles();
  console.log(resource);
  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      <Typography variant="h1" align="center">{resource.title}</Typography>
      <Button className={classes.button} variant="outlined" disableElevation size="small" startIcon={<BookmarkBorder />}>Save for later</Button>
      {richTextHelper(resource.description)}
      <Typography varient="h2">Start Exploring</Typography>
      <ol>
        {resource.content.map((note) => (
          <LinkUi color="inherit" href="/"><li>{note.title}</li></LinkUi>
        ))}
      </ol>

      <SignUpPrompt url="/" />
    </Box>
  );
};

ResourceContents.propTypes = {

};

ResourceContents.defaultProps = {

};

export default ResourceContents;
