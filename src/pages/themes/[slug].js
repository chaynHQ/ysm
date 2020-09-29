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
import React from 'react';
import { useSelector } from 'react-redux';
import ResourceCard from '../../components/ResourceCard';
import SignUpPrompt from '../../components/SignUpPrompt';
import richTextHelper from '../../shared/rich-text';
import { fetchResources, fetchThemes } from '../../store/actions';
import { wrapper } from '../../store/store';

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

const ThemePage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;

  const theme = useSelector((state) => state.themes.find((t) => t.slug === slug));
  const themes = useSelector((state) => state.themes.filter((t) => t.slug !== slug));

  let resources = [];
  if (theme) {
    resources = useSelector((state) => state.resources.filter(
      (resource) => resource.themes && resource.themes.includes(theme.id),
    ));
  }

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
                slug={resource.slug}
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

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    if (store.getState().themes.length < 1) {
      await store.dispatch(fetchThemes());
    }
    if (store.getState().resources.length < 1) {
      await store.dispatch(fetchResources());
    }
  },
);

export default ThemePage;