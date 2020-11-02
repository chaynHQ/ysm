import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
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
        {richTextHelper(item.description)}

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
                content = item.items.map((value) => (
                  <Accordion key={value.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>{value.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box display="flex" flexDirection="column">
                        {richTextHelper(value.content)}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ));
                break;
              case 'checklist':
                content = (
                  <List>
                    {item.items.map((value) => (
                      <>
                        <ListItem key={value.id}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText>{richTextHelper(value.content)}</ListItemText>
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                );
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
