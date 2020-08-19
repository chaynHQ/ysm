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
  CardActionArea,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import {
  ArrowBack,
} from '@material-ui/icons';

import { fetchThemes, fetchResources } from '../store/actions';
import illustration from '../assets/homepage-illustration.png';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    height: 200,
    margin: 6,
  },
  cardMedia: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    boxShadow: 'inset 0 0 0 1000px rgba(36, 42, 74, 0.3)',
  },
  iconContainer: {
    backgroundColor: '#EADED6',
    width: '100%',
    height: '100%',
  },
  link: {
    color: '#D27200',
  },
  linkSubtitle: {
    margin: 0,
  },
}));

const Theme = ({
  fetchResourcesOnRender, fetchThemesOnRender, resources, theme,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!theme) {
      fetchThemesOnRender();
    }
    if (resources.length <= 0) {
      fetchResourcesOnRender();
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      className={classes.container}
      pt={3.5}
      px={2}
    >
      { !theme
        ? <Typography>Theme does not exist</Typography>
        : (
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link component={RouterLink} color="inherit" to="/your-journey">
                <Box display="flex" alignItems="center">
                  <ArrowBack className={classes.icon} />
                  Back to Your Jorney
                </Box>
              </Link>

            </Breadcrumbs>
            <Typography variant="h1">{theme.title}</Typography>
            <Typography component={'span'}>{ReactHtmlParser(theme.description)}</Typography>
          </Box>
        )}

      { resources.length < 1
        ? <Typography>There are no resources for this theme</Typography>
        : (
          <Box>
            {resources.map((resource) => (
              <Card key={resource.id} className={classes.card}>
                <CardActionArea className={classes.cardMedia} component={RouterLink} to={`/your-journey/${theme.slug}`}>
                  <CardMedia
                    className={classes.cardContent}
                    image={illustration}
                  >
                    <CardContent>
                      <Typography variant="h2" className={classes.title} color="textSecondary">
                        {resource.title}
                      </Typography>
                    </CardContent>
                  </CardMedia>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}

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
};

Theme.defaultProps = {
  resources: [],
  theme: undefined,
};

const mapStateToProps = (state, ownProps) => {
  const theme = state.themes.find((t) => t.slug === ownProps.match.params.themeSlug);
  const resources = theme !== undefined ? state.resources.filter(
    (resource) => resource.themes && resource.themes.includes(theme.id),
  ) : [];
  return {
    theme,
    resources,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchThemesOnRender: () => dispatch(fetchThemes()),
  fetchResourcesOnRender: () => dispatch(fetchResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
