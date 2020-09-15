import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from '@material-ui/core';

import Link from 'next/link';
import Button from '@material-ui/core/Button';
import {
  ArrowBack,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import richTextHelper from '../shared/rich-text';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 0,
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  },
  content: {
    backgroundColor: theme.palette.info.contrastText,
    color: theme.palette.info.main,
  },
  button: {
    margin: '0 auto',
  },
}));

const StaticPage = ({ content }) => {
  const classes = useStyles();
  const router = useRouter();

  const richTextTransformer = (node) => {
    if (node.type === 'tag' && node.name === 'p' && node.children[0] && node.children[0].name === 'a') {
      return (
        <Link
          key={`index ${node.children[0].children[0].data}`}
          href={node.children[0].attribs.href}
          passHref
        >
          <Button
            variant="contained"
            className={classes.button}
          >
            {node.children[0].children[0].data}
          </Button>
        </Link>
      );
    }
    return undefined;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
    >
      <Card height="25%" className={classes.card}>
        <CardActions>
          <IconButton onClick={() => { router.back(); }}>
            <ArrowBack />
          </IconButton>
        </CardActions>
        <Typography align="center" variant="h1">{content.title}</Typography>
        <CardMedia
          component="img"
          alt={content.image.alt}
          height="140"
          image={content.image.filename}
          title={content.image.title}
        />
      </Card>
      <Box className={classes.content} minHeight="75%" px={2} py={3} display="flex" flexDirection="column">
        {richTextHelper(content.content, (node) => richTextTransformer(node))}
      </Box>
    </Box>
  );
};

StaticPage.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StaticPage;
