import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
} from '@material-ui/core';
import {
  ArrowBack, Search,
} from '@material-ui/icons';

import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import { axiosGet } from '../../store/axios';

import ResourceContent from '../../components/ResourceContent';
import ResourceContents from '../../components/ResourceContents';

const useStyles = makeStyles((theme) => ({
}));

const ResourcePage = ({ resource, theme }) => {
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
        <Link href={`/themes/${theme.slug}`} passHref>
          <LinkUi component="a" color="inherit">
            <Box display="flex" alignItems="center">
              <ArrowBack className={classes.icon} />
            </Box>
          </LinkUi>
        </Link>

      </Breadcrumbs>
      {resource.content.length === 1
        ? <ResourceContent title={resource.title} content={resource.content[0]} />
        : <ResourceContents resource={resource} />}

    </Box>
  );
};

ResourcePage.propTypes = {

};

ResourcePage.defaultProps = {

};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const resource = await axiosGet(`resources/${slug}`);

  const themes = await axiosGet('themes');

  const theme = themes.find((t) => resource.themes.includes(t.id));

  return { props: { resource, theme } };
}

export default ResourcePage;
