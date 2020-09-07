import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import {
  makeStyles,
  Typography,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import {
  ArrowBack,
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
  cardContent: {
    height: '100%',
    display: 'flex',
    boxShadow: 'inset 0 0 0 1000px rgba(36, 42, 74, 0.3)',
  },
  link: {
    color: '#ffffff',
  },
}));

const ThemePage = ({
  resources, theme,
}) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      className={classes.container}
    >
      { !theme
        ? <Typography>Theme does not exist</Typography>
        : (
          <Card raised={false} square>
            <CardMedia
              className={classes.cardContent}
              image={theme.image ? theme.image.filename : null}
            >
              <CardContent>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link href="/your-journey">
                    <LinkUi component="a" color="inherit">
                      <Box display="flex" alignItems="center" className={classes.link}>
                        <ArrowBack className={classes.icon} />
                        Back to Your Journey
                      </Box>
                    </LinkUi>
                  </Link>
                </Breadcrumbs>
                <Typography color="textSecondary" variant="h1">{theme.title}</Typography>
                <Typography
                  color="textSecondary"
                  component="div"
                >
                  {ReactHtmlParser(richTextHelper(theme.description))}
                </Typography>
              </CardContent>
            </CardMedia>
          </Card>
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
      <SignUpPrompt />

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
};

ThemePage.defaultProps = {
  resources: [],
  theme: null,
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const themes = await axiosGet('themes');
  const theme = themes.filter((theme) => theme.slug === slug)[0] || null;

  let resources = [];
  // TODO: Need a design for the case where there are no resources
  if (theme) {
    const allResourses = await axiosGet('resources');
    resources = allResourses.filter(
      (resource) => resource.themes && resource.themes.includes(theme.id),
    );
  }

  return { props: { theme, resources } };
}

export default ThemePage;
