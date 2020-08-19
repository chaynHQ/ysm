import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Breadcrumbs,
  Button,
  Avatar,
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

import { fetchThemes } from '../store/actions';
import useWindowDimensions from '../shared/dimensions';

import smallIllustration from '../assets/resource-illustration.png';
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

const Overview = ({ fetchThemesOnRender, themes }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (themes.length <= 0) {
      fetchThemesOnRender();
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          <Box display="flex" alignItems="center">
            <ArrowBack className={classes.icon} />
            Back to Home
          </Box>
        </Link>

      </Breadcrumbs>
      <Typography variant="h1">Your Journey</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac
      </Typography>
      {themes.map((theme) => (
        <Card key={theme.id} className={classes.card}>
          <CardActionArea className={classes.cardMedia} component={RouterLink} to="/">
            <CardMedia
              className={classes.cardContent}
              image={illustration}
            >
              <CardContent>
                <Typography variant="h2" className={classes.title} color="textSecondary">
                  {theme.title}
                </Typography>
              </CardContent>
            </CardMedia>
          </CardActionArea>
        </Card>
      ))}
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          <Box display="flex" alignItems="center">
            <ArrowBack className={classes.icon} />
            Back to Home
          </Box>
        </Link>
      </Breadcrumbs>
      <Box
        display="flex"
        flexDirection="column"
        height={1}
        justifyContent="center"
        alignItems="center"
      >
        <Box width={width * 0.3} height={width * 0.3} p={4}>
          <Avatar className={classes.iconContainer} alt="Illustration of woman and a butterfly" src={smallIllustration} />
        </Box>
        <Typography variant="h1" align="center">Sign up, it’s free</Typography>
        <Typography align="center">
          Sign up to Your Story Matters and privately save resources for later.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/signin">
          Create Your Account
        </Button>
        <Box width="50%" display="flex" flexDirection="column" alignItems="center">
          <Typography align="center" variant="subtitle1" className={classes.linkSubtitle}>
            Your privacy will be protected.
          </Typography>
          <Link
            component={RouterLink}
            className={classes.link}
            underline="always"
            to="/"
            variant="subtitle1"
          >
            Read our Terms & Privacy Policy
          </Link>
        </Box>
      </Box>

    </Box>
  );
};

Overview.propTypes = {
  themes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ),
  fetchThemesOnRender: PropTypes.func.isRequired,
};

Overview.defaultProps = {
  themes: [],
};

const mapStateToProps = (state) => ({
  themes: state.themes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThemesOnRender: () => dispatch(fetchThemes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
