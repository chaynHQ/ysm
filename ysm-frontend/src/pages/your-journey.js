import React from 'react';
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
import { axiosGet } from '../store/axios';

import SignUpPrompt from '../components/SignUpPrompt';

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

const YourJourney = ({ themes }) => {
  const classes = useStyles();

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
        <Link href="/" passHref>
          <LinkUi component="a" color="inherit">
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
          <Link href={`/themes/${theme.slug}`}>
            <CardActionArea className={classes.cardMedia} component="a">
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
          </Link>
        </Card>
      ))}
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/" passHref>
          <LinkUi component="a" color="inherit">
            <Box display="flex" alignItems="center">
              <ArrowBack className={classes.icon} />
              Back to Home
            </Box>
          </LinkUi>
        </Link>

      </Breadcrumbs>
      <SignUpPrompt url="/" />

    </Box>
  );
};

export async function getServerSideProps() {
  const themes = await axiosGet('themes');

  return { props: { themes } };
}

YourJourney.propTypes = {
  themes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ),
};

YourJourney.defaultProps = {
  themes: [],
};

export default YourJourney;
