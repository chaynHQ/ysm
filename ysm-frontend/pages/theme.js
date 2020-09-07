import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { fetchThemes, fetchResources } from '../store/actions';
import SignUpPrompt from './SignUpPrompt';
import ResourceCard from './ResourceCard';

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

const Theme = ({
  fetchResourcesOnRender, fetchThemesOnRender, resources, theme, hasThemes, hasResources,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (hasThemes) {
      fetchThemesOnRender();
    }
    if (hasResources) {
      fetchResourcesOnRender();
    }
  }, [fetchThemesOnRender, hasResources, fetchResourcesOnRender, hasThemes]);

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
                  <Link component={RouterLink} to="/your-journey">
                    <Box display="flex" alignItems="center" className={classes.link}>
                      <ArrowBack className={classes.icon} />
                      Back to Your Journey
                    </Box>
                  </Link>

                </Breadcrumbs>
                <Typography color="textSecondary" variant="h1">{theme.title}</Typography>
                <Typography color="textSecondary" component="div">{ReactHtmlParser(theme.description)}</Typography>
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
        <Link component={RouterLink} color="inherit" to="/your-journey">
          <Box display="flex" alignItems="center">
            <ArrowBack className={classes.icon} />
            Back to Your Journey
          </Box>
        </Link>
      </Breadcrumbs>
      <SignUpPrompt />

    </Box>
  );
};

Theme.propTypes = {
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
  fetchThemesOnRender: PropTypes.func.isRequired,
  fetchResourcesOnRender: PropTypes.func.isRequired,
  hasThemes: PropTypes.bool,
  hasResources: PropTypes.bool,
};

Theme.defaultProps = {
  resources: [],
  theme: undefined,
  hasThemes: false,
  hasResources: false,
};

const mapStateToProps = (state, ownProps) => {
  const theme = state.themes.find((t) => t.slug === ownProps.match.params.themeSlug);
  const resources = theme !== undefined ? state.resources.filter(
    (resource) => resource.themes && resource.themes.includes(theme.id),
  ) : [];

  return {
    theme,
    resources,
    hasThemes: state.themes.length <= 0,
    hasResources: state.resources.length <= 0,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchThemesOnRender: () => {
    dispatch(fetchThemes());
  },
  fetchResourcesOnRender: () => dispatch(fetchResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
