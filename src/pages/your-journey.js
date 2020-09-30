import {
  Box,
  Breadcrumbs,
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
import React from 'react';
import { useSelector } from 'react-redux';
import SignUpPrompt from '../components/SignUpPrompt';
import richTextHelper from '../shared/rich-text';
import { fetchThemes } from '../store/actions';
import { wrapper } from '../store/store';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    height: 340,
    margin: 6,
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
  link: {
    color: '#D27200',
  },
  linkSubtitle: {
    margin: 0,
  },
}));

const YourJourney = () => {
  const classes = useStyles();
  const themes = useSelector((state) => state.themes);
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
        <Link href="/search" passHref>
          <IconButton component="a">
            <Search />
          </IconButton>
        </Link>
      </Grid>

      <Typography variant="h1" align="center" color="secondary.dark">Your Journey</Typography>
      <Typography align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac
      </Typography>
      {themes.map((theme) => (
        <Card
          key={theme.id}
          className={classes.card}
          variant="outlined"
        >
          <Link href={`/themes/${theme.slug}`}>
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
                      height="200"
                      component="img"
                      image={theme.image.filename}
                    />
                  ) : null }
              </CardContent>

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

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    if (store.getState().themes.length < 1) {
      await store.dispatch(fetchThemes());
    }
  },
);

export default YourJourney;
