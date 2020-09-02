import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import {
  ArrowBack,
} from '@material-ui/icons';

import { fetchThemes } from '../store/actions';

// import SignUpPrompt from './SignUpPrompt';

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

const YourJourney = ({ fetchThemesOnRender, themes, hasThemes }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   if (hasThemes) {
  //     fetchThemesOnRender();
  //   }
  // }, [fetchThemesOnRender, hasThemes]);

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
        <Link href="/">
          <LinkUi component={"a"}  color="inherit">
            <Box display="flex" alignItems="center">
              <ArrowBack className={classes.icon} />
              Back to Home
            </Box>
          </LinkUi>
        </Link>

      </Breadcrumbs>
      <Typography variant="h1">Your Journey</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac
      </Typography>
      {themes.map((theme) => (
        <Card key={theme.id} className={classes.card}>
          <CardActionArea className={classes.cardMedia} component={RouterLink} to={`/your-journey/${theme.slug}`}>
            <CardMedia
              className={classes.cardContent}
              image="/homepage-illustration.png"
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
        <Link href="/">
          <LinkUi component={"a"}  color="inherit">
            <Box display="flex" alignItems="center">
              <ArrowBack className={classes.icon} />
              Back to Home
            </Box>
          </LinkUi>
        </Link>

      </Breadcrumbs>
      {/* <SignUpPrompt url="/" /> */}

    </Box>
  );
};

YourJourney.propTypes = {
  themes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ),
  fetchThemesOnRender: PropTypes.func.isRequired,
  hasThemes: PropTypes.bool,
};

YourJourney.defaultProps = {
  themes: [],
  hasThemes: false,
};

const mapStateToProps = (state) => ({
  themes: state.themes,
  hasThemes: state.themes.length <= 0,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchThemesOnRender: () => dispatch(fetchThemes()),
  fetchThemesOnRender: () => console.log('FETCHING THEMES'),
});

export default connect(mapStateToProps, mapDispatchToProps)(YourJourney);
