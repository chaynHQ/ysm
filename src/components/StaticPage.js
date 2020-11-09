import {
  Box,
  Card,

  CardActions, CardMedia,

  IconButton, makeStyles,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ArrowBack } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import richTextHelper from '../shared/rich-text';
import Head from './Head';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 0,
    margin: 0,
    backgroundColor: theme.palette.info.main,
    color: theme.palette.secondary.dark,
  },
  content: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.light,
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
    <>
      <Head title={content.title} ogImage="logo.png" />
      <Box
        display="flex"
        flexDirection="column"
        direction="column"
        height={1}
      >
        <Card className={classes.card}>
          <CardActions>
            <IconButton onClick={() => { router.back(); }}>
              <ArrowBack />
            </IconButton>
          </CardActions>
          <Typography align="center" variant="h1">{content.title}</Typography>
          <CardMedia
            component="img"
            alt={content.image.alt}
            image={content.image.filename}
            title={content.image.title}
          />
        </Card>
        <Box className={classes.content} flexGrow={1} px={2} py={3} display="flex" flexDirection="column">
          {richTextHelper(content.content, (node) => richTextTransformer(node))}
        </Box>
      </Box>
    </>
  );
};

StaticPage.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StaticPage;
