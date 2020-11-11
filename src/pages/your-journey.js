import {
  Box,

  Card,
  CardActionArea,
  CardContent,

  CardMedia,

  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack, Search } from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Head from '../components/Head';
import SearchModal from '../components/SearchModal';
import SignUpPrompt from '../components/SignUpPrompt';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import richTextHelper from '../shared/rich-text';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    margin: 6,
    backgroundColor: theme.palette.primary.light,
  },
  cardMedia: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 14,
    paddingLeft: 14,
    paddingBottom: 0,
    paddingTop: 26,

  },
  iconContainer: {
    backgroundColor: '#EADED6',
    width: '100%',
    height: '100%',
  },
}));

const YourJourney = ({ propThemes, container, previewMode }) => {
  const classes = useStyles();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [themes, setThemes] = useState(propThemes);

  useEffect(() => {
    if (previewMode && user) {
      user
        .getIdToken()
        .then((idToken) => axiosGet('themes', {
          headers: {
            'X-PREVIEW-MODE': 'preview',
            authorization: `Bearer ${idToken}`,
          },
        }))
        .then((allThemes) => { setThemes(allThemes); });
    }
  }, [user]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      {themes
        ? (
          <>
            <Head
              title="Your Journey"
            />
            <Grid container justify="space-between" direction="row">
              <Link href="/" passHref>
                <LinkUi component="a" color="inherit">
                  <Box display="flex" alignItems="center">
                    <ArrowBack className={classes.icon} />
                  </Box>
                </LinkUi>
              </Link>
              <IconButton component="a" onClick={() => { setShowSearchModal(true); }}>
                <Search />
              </IconButton>
              <SearchModal
                shown={showSearchModal}
                container={container}
                closeModal={() => { setShowSearchModal(false); }}
              />

            </Grid>

            <Typography variant="h1" align="center">Your Journey</Typography>
            <Typography align="center">
              Browse accessible resources curated by a team of survivors.
              Save what you love and come back anytime.
            </Typography>
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={classes.card}
              >
                <Link href="/themes/[slug]" as={`/themes/${theme.slug}`}>
                  <CardActionArea component="a">
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h2" align="center" color="textSecondary">
                        {theme.title}
                      </Typography>
                      <Typography align="center">
                        {richTextHelper(theme.description)}
                      </Typography>
                      {theme.image
                        ? (
                          <CardMedia
                            component="img"
                            image={theme.image.filename}
                          />
                        ) : null }
                    </CardContent>

                  </CardActionArea>
                </Link>
              </Card>
            ))}

            <Box pt={4}>
              <Link href="/" passHref>
                <LinkUi component="a" underline="always" color="inherit">
                  <Box display="flex" alignItems="center">
                    <ArrowBack className={classes.icon} />
                    <Typography variant="body2">Back to Home</Typography>
                  </Box>
                </LinkUi>
              </Link>
            </Box>
            <SignUpPrompt url="/" />
          </>
        )
        : null }
    </Box>
  );
};

export async function getServerSideProps({ preview }) {
  let propThemes = null;
  if (!preview) {
    propThemes = await axiosGet('themes');
  }

  return { props: { propThemes, previewMode: preview || false } };
}

YourJourney.propTypes = {
  container: PropTypes.objectOf(PropTypes.any).isRequired,
  propThemes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ),
  previewMode: PropTypes.bool,
};

YourJourney.defaultProps = {
  propThemes: [],
  previewMode: false,
};

export default YourJourney;
