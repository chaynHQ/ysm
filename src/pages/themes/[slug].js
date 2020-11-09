import {
  Avatar, Box,
  Breadcrumbs,

  Card,
  CardActionArea,
  CardContent, Grid,
  IconButton, makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack, Search } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Head from '../../components/Head';
import ResourceCard from '../../components/ResourceCard';
import SearchModal from '../../components/SearchModal';
import SignUpPrompt from '../../components/SignUpPrompt';
import firebase from '../../config/firebase';
import { axiosGet } from '../../shared/axios';
import isBrowser from '../../shared/browserCheck';
import richTextHelper from '../../shared/rich-text';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    color: '#ffffff',
  },
  card: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingTop: 16,
  },
}));

const ThemePage = ({
  propThemes, propResources, container, previewMode,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const { slug } = router.query;

  const [themes, setThemes] = useState(propThemes.filter((t) => t.slug !== slug));
  const [theme, setTheme] = useState(propThemes.find((t) => t.slug === slug));
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setThemes(propThemes.filter((t) => t.slug !== slug));
    setTheme(propThemes.find((t) => t.slug === slug));
  }, [slug]);

  useEffect(() => {
    if (theme) {
      setResources(propResources.filter(
        (resource) => resource.themes && resource.themes.includes(theme.id),
      ));
    }
  }, [slug]);

  useEffect(() => {
    if (previewMode && user) {
      const headers = {
        'X-PREVIEW-MODE': 'preview',
        authorization: `Bearer ${user.xa}`,
      };

      axiosGet('themes', {
        headers,
      }).then((allThemes) => {
        setThemes(allThemes.filter((t) => t.slug !== slug));
        const previewTheme = allThemes.find((t) => t.slug === slug);
        setTheme(previewTheme);
        axiosGet('resources', {
          headers,
        }).then((allResources) => {
          setResources(allResources.filter(
            (resource) => resource.themes && resource.themes.includes(previewTheme.id),
          ));
        });
      });
    }
  }, [slug, user]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      <Grid container justify="space-between" direction="row">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/your-journey" passHref>
            <LinkUi component="a" color="inherit">
              <Box display="flex" alignItems="center">
                <ArrowBack className={classes.icon} />
              </Box>
            </LinkUi>
          </Link>

        </Breadcrumbs>
        <IconButton component="a" onClick={() => setShowSearchModal(true)}>
          <Search />
        </IconButton>
        <SearchModal
          shown={showSearchModal}
          container={container}
          closeModal={() => setShowSearchModal(false)}
        />

      </Grid>
      { !theme
        ? <Typography>Theme does not exist</Typography>
        : (
          <>
            <Head
              title={theme.title}
              ogImage={theme.image ? theme.image.filename : null}
              ogImageAlt={theme.image ? theme.image.alt : null}
            />
            <Typography color="textSecondary" align="center" variant="h1">{theme.title}</Typography>
            <Typography
              color="textSecondary"
              component="div"
              align="center"
            >
              {richTextHelper(theme.description)}
            </Typography>
          </>
        )}

      { resources.length < 1
        ? <Typography>There are no resources for this theme</Typography>
        : (
          <Box
            pt={3.5}
            px={2}
          >
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                subtitle={resource.subtitle}
                image={resource.image}
                slug={resource.slug}
                savingRedirectUrl={`/themes/${theme.slug}`}
              />
            ))}
          </Box>
        )}

      <Box py={4}>
        <Typography variant="h2">Explore other themes </Typography>

        {themes.map((t) => (
          <Card variant="outlined" key={t.id}>
            <Link href="/themes/[slug]" as={`/themes/${t.slug}`}>
              <CardActionArea component="a">
                <CardContent className={classes.card}>
                  <Box display="flex">
                    {t.image
                      ? (
                        <Avatar
                          variant="square"
                          alt={t.image.alt}
                          src={t.image.filename}
                        />
                      )
                      : null}
                    <Box width={1}>
                      <Typography align="center">
                        {t.title}
                      </Typography>
                    </Box>

                  </Box>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        ))}

      </Box>

      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/your-journey">
          <LinkUi component="a" color="inherit">
            <Box display="flex" alignItems="center">
              <ArrowBack className={classes.icon} />
              Back to Your Journey
            </Box>
          </LinkUi>
        </Link>
      </Breadcrumbs>

      <SignUpPrompt url="/" />

    </Box>
  );
};
export async function getServerSideProps({ preview }) {
  let propThemes = [];
  let propResources = [];
  if (!preview) {
    propThemes = await axiosGet('themes');
    propResources = await axiosGet('resources');
  }

  return { props: { propThemes, propResources, previewMode: preview || false } };
}

ThemePage.propTypes = {
  container: PropTypes.objectOf(PropTypes.any).isRequired,
  propThemes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ),
  propResources: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  ),
  previewMode: PropTypes.bool,
};

ThemePage.defaultProps = {
  propThemes: [],
  propResources: [],
  previewMode: false,
};

export default ThemePage;
