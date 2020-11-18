import {
  Box,

  Card,
  CardActionArea,
  CardContent, Grid, makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Head from '../../../../components/Head';
import Item from '../../../../components/Item';
import firebase from '../../../../config/firebase';
import { axiosGet } from '../../../../shared/axios';
import isBrowser from '../../../../shared/browserCheck';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.error.main,
  },
  icon: {
    paddingRight: 6,
  },

}));

const ItemPage = ({ propResource, previewMode }) => {
  const router = useRouter();
  const classes = useStyles();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const { itemId, resourceSlug } = router.query;
  const [resource, setResource] = useState(propResource);
  const [item, setItem] = useState(
    propResource ? propResource.content.find((i) => i.id === itemId) : null,
  );
  const [nextItem, setNextItem] = useState(
    propResource
      ? propResource.content[propResource.content.findIndex(
        (i) => i.id === itemId,
      ) + 1] || null
      : null,
  );

  useEffect(() => {
    if (previewMode && user) {
      setResource(propResource);
      setItem(propResource ? propResource.content.find((i) => i.id === itemId) : null);
      setNextItem(propResource
        ? propResource.content[propResource.content.findIndex(
          (i) => i.id === itemId,
        ) + 1] || null
        : null);
    }
  }, [itemId, resourceSlug]);

  useEffect(() => {
    if (previewMode && user) {
      user
        .getIdToken()
        .then((idToken) => {
          const headers = {
            'X-PREVIEW-MODE': 'preview',
            authorization: `Bearer ${idToken}`,
          };
          return axiosGet(`resources/${resourceSlug}`, { headers }).then((previewResource) => {
            if (previewResource.status === 404) {
              router.push('/404');
            } else {
              setResource(previewResource);
              setItem(previewResource.content.find((i) => i.id === itemId));
              setNextItem(previewResource.content[previewResource.content.findIndex(
                (i) => i.id === itemId,
              ) + 1] || null);
            }
          });
        });
    }
  }, [user, itemId, resourceSlug]);

  useEffect(() => {
    if (!previewMode && item) {
      firebase.analytics().logEvent('select_content', {
        content_type: 'resource_content_item',
        item_id: `${resource.slug}/${itemId}`,
      });
    }
  }, [item, itemId, resourceSlug]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      {resource && item
        ? (
          <>
            <Head
              title={item.title}
              ogImage={resource.image ? resource.image.filename : null}
              ogImageAlt={resource.image ? resource.image.alt : null}
            />

            <Link href="/resources/[resourceSlug]" as={`/resources/${resource.slug}`} passHref>
              <LinkUi component="a" underline="always" color="inherit">
                <Box display="flex" alignItems="center">
                  <ArrowBack className={classes.icon} />
                  <Typography variant="subtitle1">
                    Part of:
                    {' '}
                    {resource.title}
                  </Typography>
                </Box>
              </LinkUi>
            </Link>

            <Item item={item} />
            <Box>

              <Card variant="outlined" className={classes.card}>
                <Link
                  href={nextItem ? '/resources/[resourceSlug]/items/[itemId]' : '/resources/[resourceSlug]'}
                  as={nextItem ? `/resources/${resource.slug}/items/${nextItem.id}` : `/resources/${resource.slug}`}
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
                            component="span"
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
          </>
        )
        : null }

    </Box>
  );
};
export async function getServerSideProps({ preview, params }) {
  let propResource = null;
  if (!preview) {
    propResource = await axiosGet(`resources/${params.resourceSlug}`);
  }

  if (propResource && propResource.status === 404) {
    return { notFound: true };
  }

  return { props: { propResource, previewMode: preview || false } };
}

ItemPage.propTypes = {
  propResource:
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  previewMode: PropTypes.bool,
};

ItemPage.defaultProps = {
  propResource: null,
  previewMode: false,
};

export default ItemPage;
