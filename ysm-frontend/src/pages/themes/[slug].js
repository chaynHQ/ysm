import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
} from '@material-ui/core';
import {
  ArrowBack, Search,
} from '@material-ui/icons';

import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import { axiosGet } from '../../store/axios';
import richTextHelper from '../../shared/rich-text';

import SignUpPrompt from '../../components/SignUpPrompt';
import ResourceCard from '../../components/ResourceCard';

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
  resources, theme, themes,
}) => {
  const classes = useStyles();

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
          <Link href="/" passHref>
            <LinkUi component="a" color="inherit">
              <Box display="flex" alignItems="center">
                <ArrowBack className={classes.icon} />
              </Box>
            </LinkUi>
          </Link>

        </Breadcrumbs>
        <Link href="/search" passHref>
          <IconButton component="a">
            <Search />
          </IconButton>
        </Link>
      </Grid>
      { !theme
        ? <Typography>Theme does not exist</Typography>
        : (
          <>
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
              />
            ))}
          </Box>
        )}

      <Box>
        <Typography variant="h2">Explore other themes </Typography>

        {themes.map((t) => (
          <Card variant="outlined" key={t.id}>
            <Link href={t.slug}>
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

ThemePage.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  ),
  theme: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  ),
  themes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  ),
};

ThemePage.defaultProps = {
  resources: [],
  theme: null,
  themes: [],
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const allThemes = await axiosGet('themes');

  const splitThemes = allThemes.reduce((output, t) => {
    if (t.slug === slug) output[0].push(t);
    else output[1].push(t);
    return output;
  }, [[], []]);

  const theme = splitThemes[0][0];
  const themes = splitThemes[1];

  let resources = [];
  // TODO: Need a design for the case where there are no resources
  if (theme) {
    const allResourses = await axiosGet('resources');
    resources = allResourses.filter(
      (resource) => resource.themes && resource.themes.includes(theme.id),
    );
  }

  return { props: { theme, resources, themes } };
}

export default ThemePage;
