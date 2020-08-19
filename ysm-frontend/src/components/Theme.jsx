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
  Button,
  Avatar,
} from '@material-ui/core';
import {
  BookmarkBorder,
  ArrowBack,
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { fetchThemes, fetchResources } from '../store/actions';
import SignUpPrompt from './SignUpPrompt';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
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
    color: '#ffffff',
  },
  linkSubtitle: {
    margin: 0,
  },
  avatar: {
    height: '70px',
    width: '70px',
  },
  button: {
    fontSize: '12px',
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
              <Card key={resource.id} className={classes.card}>
                <CardActionArea className={classes.cardMedia} component={RouterLink} to={`/your-journey/${theme.slug}`}>
                  <CardContent>
                    <Box display="flex" flexDirection="row">
                      <Box>
                        <Typography variant="h2" className={classes.title}>
                          {resource.title}
                        </Typography>
                        <Typography>
                          {resource.subtitle}
                        </Typography>
                      </Box>
                      {resource.image
                        ? (
                          <Avatar
                            alt={resource.image.alt}
                            src={resource.image.filename}
                            className={classes.avatar}
                          />
                        )
                        : null}
                    </Box>
                    <Button className={classes.button} color="secondary" variant="contained" disableElevation size="small" startIcon={<BookmarkBorder />}>Save for later</Button>
                  </CardContent>
                </CardActionArea>
              </Card>
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
