import { Box, Typography } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import richTextHelper from '../shared/rich-text';
import SaveButton from './SaveButton';

const Item = ({ item, canBeSaved }) => (
  <Box
    display="flex"
    flexDirection="column"
    direction="column"
    pt={3.5}
    px={2}
  >
    <Typography variant="h1" align="center">{item.title}</Typography>

    {canBeSaved ? <SaveButton resourceSlug={item.slug} /> : null}

    {item.type === 'external_link'
      ? <LinkUi href={item.link} color="inherit">Go to resource</LinkUi>
      : richTextHelper(item.content)}

  </Box>
);

Item.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  canBeSaved: PropTypes.bool,
};

Item.defaultProps = {
  canBeSaved: false,
};

export default Item;
