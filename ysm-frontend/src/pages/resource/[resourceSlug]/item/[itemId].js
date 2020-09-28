import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import {
  ArrowBack, ArrowForward,
} from '@material-ui/icons';

import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import { useRouter } from 'next/router';

import { axiosGet } from '../../../../store/axios';

import Item from '../../../../components/Item';

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

const ItemPage = ({
  item, resourceTitle, resourceSlug, nextItem,
}) => {
  const classes = useStyles();
  const router = useRouter();

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
                {resourceTitle}
              </LinkUi>
            </Typography>
          </Box>
        </Link>

      </Breadcrumbs>

      <Item item={item} />

      <Card variant="outlined" className={classes.card}>
        <Link href={nextItem ? `/resource/${router.query.resource_slug}/item/${nextItem.id}` : `/resource/${router.query.resource_slug}`}>
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
                    {nextItem ? nextItem.title : resourceTitle}
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

ItemPage.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  resourceTitle: PropTypes.string.isRequired,
  resourceSlug: PropTypes.string.isRequired,
  nextItem: PropTypes.objectOf(PropTypes.any),

};

ItemPage.defaultProps = {
  nextItem: null,
};

export async function getServerSideProps({ params }) {
  const { resourceSlug, itemId } = params;
  const resource = await axiosGet(`resources/${resourceSlug}`);

  const item = resource.content.find((i) => i.id === itemId);
  const nextItem = resource.content[resource.content.findIndex((i) => i.id === itemId) + 1];

  return {
    props: {
      item, resourceTitle: resource.title, resourceSlug, nextItem: nextItem || null,
    },
  };
}

export default ItemPage;
