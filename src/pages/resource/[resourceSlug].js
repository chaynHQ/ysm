import { Box, Breadcrumbs } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack } from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Item from '../../components/Item';
import ResourceContents from '../../components/ResourceContents';
import { axiosGet } from '../../store/axios';

const ResourcePage = ({ resource, theme }) => (
  <Box
    display="flex"
    flexDirection="column"
    direction="column"
    pt={3.5}
    px={2}
  >

    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/themes/slug" as={`/themes/${theme.slug}`} passHref>
        <LinkUi component="a" color="inherit">
          <Box display="flex" alignItems="center">
            <ArrowBack />
          </Box>
        </LinkUi>
      </Link>

    </Breadcrumbs>
    {resource.content && resource.content.length === 1
      ? <Item item={resource.content[0]} canBeSaved />
      : <ResourceContents resource={resource} />}

  </Box>
);

export async function getServerSideProps({ params }) {
  const themes = await axiosGet('themes');

  const resource = await axiosGet(`resources/${params.resourceSlug}`);

  return { props: { resource, theme: themes.find((t) => resource.themes.includes(t.id)) } };
}

ResourcePage.propTypes = {
  resource:
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool,
      ]),
    ),
  theme: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  ),
};

ResourcePage.defaultProps = {
  resource: null,
  theme: null,
};
export default ResourcePage;
