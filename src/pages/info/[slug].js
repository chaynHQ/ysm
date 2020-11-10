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
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Head from '../../components/Head';
import firebase from '../../config/firebase';
import { axiosGet } from '../../shared/axios';
import isBrowser from '../../shared/browserCheck';
import richTextHelper from '../../shared/rich-text';

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

const InfoPage = ({ propContent, previewMode }) => {
  const router = useRouter();
  const classes = useStyles();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [content, setContent] = useState(propContent);
  const { slug } = router.query;

  useEffect(() => {
    if (previewMode && user) {
      axiosGet(`pages/${slug}`, {
        headers: {
          'X-PREVIEW-MODE': 'preview',
          authorization: `Bearer ${user.xa}`,
        },
      }).then((pageContent) => { setContent(pageContent); });
    }
  }, [user]);

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

  if (content) {
    return (
      <>
        <Head
          title={content.title}
        />
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
  }
  return null;
};

export async function getServerSideProps({ preview, params }) {
  let propContent = null;
  if (!preview) {
    propContent = await axiosGet(`pages/${params.slug}`);
  }

  return { props: { propContent, previewMode: preview || false } };
}

InfoPage.propTypes = {
  propContent: PropTypes.objectOf(PropTypes.any).isRequired,
  previewMode: PropTypes.bool,
};

InfoPage.defaultProps = {
  previewMode: false,
};

export default InfoPage;
