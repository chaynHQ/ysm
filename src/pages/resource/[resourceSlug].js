import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Breadcrumbs,
} from '@material-ui/core';
import {
  ArrowBack,
} from '@material-ui/icons';

import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import { axiosGet } from '../../store/axios';

import Item from '../../components/Item';
import ResourceContents from '../../components/ResourceContents';

const ResourcePage = ({ resource, theme }) => (
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

ResourcePage.propTypes = {
  resource: PropTypes.objectOf(PropTypes.any).isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

export async function getServerSideProps({ params }) {
  const { resourceSlug } = params;
  const resource = await axiosGet(`resources/${resourceSlug}`);

  const themes = await axiosGet('themes');

  const theme = themes.find((t) => resource.themes.includes(t.id));

  return { props: { resource, theme } };
}

export default ResourcePage;
