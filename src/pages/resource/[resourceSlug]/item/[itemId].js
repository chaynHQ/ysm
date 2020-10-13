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
import PropTypes from 'prop-types';
import React from 'react';
import Item from '../../../../components/Item';
import { axiosGet } from '../../../../store/axios';

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

const ItemPage = ({ resource, item, nextItem }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >

      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/resource/resourceSlug" as={`/resource/${resource.slug}`} passHref>
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
        <Link
          href={nextItem ? '/resource/resourceSlug/item/itemId' : '/resource/resourceSlug'}
          as={nextItem ? `/resource/${resource.slug}/item/${nextItem.id}` : `/resource/${resource.slug}`}
        >
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
export async function getServerSideProps({ params }) {
  const resource = await axiosGet(`resources/${params.resourceSlug}`);
  const item = resource.content.find((i) => i.id === params.itemId);
  const nextItem = resource.content[resource.content.findIndex(
    (i) => i.id === params.itemId,
  ) + 1];

  return { props: { resource, item, nextItem: nextItem || null } };
}

ItemPage.propTypes = {
  resource:
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  item: PropTypes.objectOf(
    PropTypes.any,
  ),
  nextItem: PropTypes.objectOf(
    PropTypes.any,
  ),
};

ItemPage.defaultProps = {
  resource: null,
  item: null,
  nextItem: null,
};

export default ItemPage;
