import {
  Box,
  Breadcrumbs,

  Card,
  CardActionArea,
  CardContent, Grid, makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Item from '../../../../components/Item';
import { fetchResource } from '../../../../store/actions';
import { wrapper } from '../../../../store/store';

const useStyles = makeStyles(() => ({
  link: {
    color: '#D27200',
  },
  breadcrumbs: {
    marginBottom: 0,
  },
  icon: {
    paddingRight: 6,
  },
  card: {
    backgroundColor: '#ffffff',
  },

}));

const ItemPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { resourceSlug, itemId } = router.query;

  const resource = useSelector((state) => state.resources.find((r) => r.slug === resourceSlug));
  const item = resource.content.find((i) => i.id === itemId);
  const nextItem = resource.content[resource.content.findIndex((i) => i.id === itemId) + 1];

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >

      <Breadcrumbs aria-label="breadcrumb">
        <Link href={`/resource/${resourceSlug}`} passHref>
          <Box display="flex" alignItems="center" justifyContent="center">
            <ArrowBack className={classes.icon} />
            <Typography color="textSecondary" className={classes.breadcrumbs}>
              Part of:
              <LinkUi
                underline="always"
                className={classes.link}
              >
                {resource.title}
              </LinkUi>
            </Typography>
          </Box>
        </Link>

      </Breadcrumbs>

      <Item item={item} />

      <Card variant="outlined" className={classes.card}>
        <Link href={nextItem ? `/resource/${router.query.resourceSlug}/item/${nextItem.id}` : `/resource/${router.query.resourceSlug}`}>
          <CardActionArea component="a" className={classes.cardMedia}>
            <CardContent>
              <Grid container justify="space-between" direction="row">
                <Typography color="textSecondary">
                  {nextItem ? 'Continue: ' : 'That was the last note on: '}
                  {' '}
                  <LinkUi
                    underline="always"
                    className={classes.link}
                  >
                    {nextItem ? nextItem.title : resource.title}
                  </LinkUi>
                </Typography>
                <ArrowForward />
              </Grid>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>

    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(

  async ({ store, params }) => {
    if (store.getState().resources.filter((r) => r.slug === params.resourceSlug).length < 1) {
      await store.dispatch(fetchResource(params.resourceSlug));
    }
  },
);

export default ItemPage;
