import { Box } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack } from '@material-ui/icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Head from '../../components/Head';
import Item from '../../components/Item';
import ResourceContents from '../../components/ResourceContents';
import { axiosGet } from '../../shared/axios';
import isBrowser from '../../shared/browserCheck';

const ResourcePage = ({ propResource, propTheme, previewMode }) => {
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const { resourceSlug } = router.query;
  const [theme, setTheme] = useState(propTheme);
  const [resource, setResource] = useState(propResource);

  useEffect(() => {
    if (previewMode && user) {
      setTheme(propTheme);
      setResource(propResource);
    }
  }, [resourceSlug]);

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
              return axiosGet('themes', { headers }).then((allThemes) => {
                setTheme(allThemes.find((t) => previewResource.themes.includes(t.id)));
              });
            }
            return { previewResource };
          });
        });
    }
  }, [user, resourceSlug]);

  useEffect(() => {
    if (!previewMode && resource) {
      firebase.analytics().logEvent('select_content', {
        content_type: 'resource',
        item_id: resource.slug,
      });
    }
  }, [resourceSlug]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3.5}
      px={2}
    >
      { theme && resource
        ? (
          <>
            <Head
              title={resource.title}
              ogImage={resource.image ? resource.image.filename : null}
              ogImageAlt={resource.image ? resource.image.alt : null}
            />
            <Link href="/themes/slug" as={`/themes/${theme.slug}`} passHref>
              <LinkUi component="a" color="inherit">
                <Box display="flex" alignItems="center">
                  <ArrowBack />
                </Box>
              </LinkUi>
            </Link>
            <Box>
              {resource.content && resource.content.length === 1
                ? (
                  <Item
                    item={{
                      ...resource.content[0],
                      description: resource.description,
                      slug: resource.slug,
                    }}
                    canBeSaved
                  />
                )
                : <ResourceContents resource={resource} />}
            </Box>
          </>
        )
        : null }
    </Box>
  );
};

export async function getServerSideProps({ preview, params }) {
  let themes = [];
  let propResource = null;

  if (!preview) {
    [themes, propResource] = await Promise.all([
      axiosGet('themes'),
      axiosGet(`resources/${params.resourceSlug}`),
    ]);
  }

  if ((propResource && propResource.status === 404) || (themes && themes.status === 404)) {
    return { notFound: true };
  }

  return {
    props: {
      propResource,
      propTheme: themes.find((t) => propResource.themes.includes(t.id)) || null,
      previewMode: preview || false,
    },
  };
}

ResourcePage.propTypes = {
  propResource:
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  propTheme: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  ),
  previewMode: PropTypes.bool,
};

ResourcePage.defaultProps = {
  propResource: null,
  propTheme: null,
  previewMode: false,
};
export default ResourcePage;
