import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card, CardContent,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  makeStyles, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player';
import richTextHelper from '../shared/rich-text';
import SaveButton from './SaveButton';

const useStyles = makeStyles(() => ({
  videoWrapper: {
    position: 'relative',
    paddingTop: '56.25%', // For correct youtube aspect ratio
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const Item = ({ item, canBeSaved }) => {
  const classes = useStyles();
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
      pt={3.5}
      px={2}

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
              <Box display="flex" justifyContent="center">
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
              </Box>
            );
          case 'note':
            return richTextHelper(item.content, (node) => richTextTransformer(node));
          case 'list':
            switch (item.render_as) {
              case 'plain':
                content = (
                  <List>
                    {item.items.map((value) => (
                      <>
                        <ListItem key={value._uid}>
                          <ListItemText
                            primary={value.title}
                            secondary={richTextHelper(value.content)}
                          />
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                );
                break;
              case 'cards':
                content = item.items.map((value) => (
                  <Card key={value._uid} variant="outlined">
                    <CardContent key={value._uid}>
                      <Typography>{value.title}</Typography>
                      {richTextHelper(value.content)}
                    </CardContent>
                  </Card>
                ));
                break;
              case 'accordion':
                content = item.items.map((value) => (
                  <Accordion key={value._uid}>
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
                        <ListItem key={value._uid}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText>{richTextHelper(value.content)}</ListItemText>
                        </ListItem>
                        <Divider key={`divider ${value._uid}`} />
                      </>
                    ))}
                  </List>
                );
                break;
              default:
                return null;
            }
            return content;
          case 'audio':
            return (
              <ReactPlayer
                url={item.url}
                controls
                width="100%"
                height="100px"
              />
            );
          case 'video':
            return (
              <div className={classes.videoWrapper}>
                <ReactPlayer
                  className={classes.videoPlayer}
                  url={item.url}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            );
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
