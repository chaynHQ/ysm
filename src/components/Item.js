import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  console.log(item);
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
        let content = null;
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
          case 'list':
            switch (item.render_as) {
              case 'plain':
                // TODO: Data not currently available
                break;
              case 'cards':
                // TODO: Data not currently available
                break;
              case 'accordion':
                content = item.items.map((accordion) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>{accordion.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box display="flex" flexDirection="column">
                        {richTextHelper(accordion.content)}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ));
                break;
              case 'checklist':
                content = <Typography>This is an checklist list</Typography>;
                break;
              default:
                return null;
            }
            return content;
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
