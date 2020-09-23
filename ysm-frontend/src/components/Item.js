import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Box,
} from '@material-ui/core';

import LinkUi from '@material-ui/core/Link';

import richTextHelper from '../shared/rich-text';

const Item = ({ item }) => (
  <Box
    display="flex"
    flexDirection="column"
    direction="column"
    pt={3.5}
    px={2}
  >
    <Typography variant="h1" align="center">{item.title}</Typography>

    {item.type === 'external_link'
      ? <LinkUi href={item.link} color="inherit">Go to resource</LinkUi>
      : richTextHelper(item.content)}

  </Box>
);

Item.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Item;
