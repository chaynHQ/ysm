import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
} from '@material-ui/core';
import {
  ArrowBack, Search,
} from '@material-ui/icons';

import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';

import richTextHelper from '../shared/rich-text';

const useStyles = makeStyles((theme) => ({
}));

const ResourceContent = ({ title, content }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      <Typography variant="h1">{title}</Typography>

      {content.type === 'external_link'
        ? <LinkUi href={content.link} color="inherit">Go to resource</LinkUi>
        : richTextHelper(content.description)}

    </Box>
  );
};

ResourceContent.propTypes = {

};

ResourceContent.defaultProps = {

};

export default ResourceContent;
