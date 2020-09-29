import { Box, Breadcrumbs } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Item from '../../components/Item';
import ResourceContents from '../../components/ResourceContents';
import { fetchResource, fetchThemes } from '../../store/actions';
import { wrapper } from '../../store/store';

const ResourcePage = () => {
  const router = useRouter();
  const { resourceSlug } = router.query;
  const resource = useSelector((state) => state.resources.find((r) => r.slug === resourceSlug));
  const theme = useSelector((state) => state.themes.find((t) => resource.themes.includes(t.id)));

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >

      <Breadcrumbs aria-label="breadcrumb">
        <Link href={`/themes/${theme.slug}`} passHref>
          <LinkUi component="a" color="inherit">
            <Box display="flex" alignItems="center">
              <ArrowBack />
            </Box>
          </LinkUi>
        </Link>

      </Breadcrumbs>
      {resource.content.length === 1
        ? <Item item={resource.content[0]} />
        : <ResourceContents resource={resource} />}

    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(

  async ({ store, params }) => {
    if (store.getState().themes.length < 1) {
      await store.dispatch(fetchThemes());
    }
    if (store.getState().resources.filter((r) => r.slug === params.resourceSlug).length < 1) {
      await store.dispatch(fetchResource(params.resourceSlug));
    }
  },
);

export default ResourcePage;
