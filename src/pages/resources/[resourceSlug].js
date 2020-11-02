import { Box, Breadcrumbs } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Item from '../../components/Item';
import ResourceContents from '../../components/ResourceContents';
import firebase from '../../config/firebase';
import isBrowser from '../../shared/browserCheck';
import { axiosGet } from '../../store/axios';

const ResourcePage = ({ propResource, propTheme, previewMode }) => {
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const { resourceSlug } = router.query;
  const [theme, setTheme] = useState(propTheme);
  const [resource, setResource] = useState(propResource);

  useEffect(() => {
    if (previewMode && user) {
      const headers = {
        'X-PREVIEW-MODE': 'preview',
        authorization: `Bearer ${user.xa}`,
      };

      axiosGet(`resources/${resourceSlug}`, { headers }).then((previewResource) => {
        setResource(previewResource);
        axiosGet('themes', { headers }).then((allThemes) => {
          setTheme(allThemes.find((t) => previewResource.themes.includes(t.id)));
        });
      });
    }
  }, [user]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      { theme && resource
        ? (
          <>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/themes/slug" as={`/themes/${theme.slug}`} passHref>
                <LinkUi component="a" color="inherit">
                  <Box display="flex" alignItems="center">
                    <ArrowBack />
                  </Box>
                </LinkUi>
              </Link>

            </Breadcrumbs>
            <Box>
              {resource.content && resource.content.length === 1
                ? <Item item={resource.content[0]} canBeSaved />
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
