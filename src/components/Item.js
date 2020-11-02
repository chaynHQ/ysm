import { Box, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import richTextHelper from '../shared/rich-text';
import SaveButton from './SaveButton';

const Item = ({ item, canBeSaved }) => {
  const richTextTransformer = (node) => {
    if (node.type === 'tag' && node.name === 'p' && node.children[0] && node.children[0].name === 'img') {
      const img = node.children[0];
      return (
        <img src={img.attribs.src} alt={img.attribs.alt} style={{ width: '100%' }} />
      );
    }

    return undefined;
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3.5}
      px={2}
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        pb={2}
        alignItems="center"
      >
        <Typography variant="h1" align="center">{item.title}</Typography>

        {canBeSaved ? <SaveButton resourceSlug={item.slug} /> : null}
      </Box>

      { (() => {
        switch (item.type) {
          case 'external_link':
            return (
              <Button
                variant="outlined"
                disableElevation
                size="small"
                onClick={() => {
                  window.open(item.link, '_newtab');
                }}
                color="secondary"
              >
                Read the Resource
              </Button>
            );
          case 'note':
            return richTextHelper(item.content, (node) => richTextTransformer(node));
          default:
            return null;
        }
      })()}

    </Box>
  );
};

Item.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  canBeSaved: PropTypes.bool,
};

Item.defaultProps = {
  canBeSaved: false,
};

export default Item;
