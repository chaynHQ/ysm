import {
  Box,

  Card,
  CardActionArea,
  CardContent,
  Grid, makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowForward } from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import richTextHelper from '../shared/rich-text';
import SaveButton from './SaveButton';
import SignUpPrompt from './SignUpPrompt';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.error.main,
  },
}));

const ResourceContents = ({ resource }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      alignItems="center"
      pt={3.5}
      px={2}
    >

      <Typography variant="h1" align="center">{resource.title}</Typography>
      <SaveButton resourceSlug={resource.slug} redirectUrl={`/resources/${resource.slug}`} />
      <Typography component={Box} color="textSecondary">
        {richTextHelper(resource.description)}
      </Typography>
      <Box width={1}>
        <Typography variant="h2" align="left">Start Exploring</Typography>
        <ol>
          {resource.content.map((item) => (
            <Link key={item.id} passHref href="/resources/[resourceSlug]/items/[itemId]" as={`/resources/${resource.slug}/items/${item.id}`}>

              <LinkUi
                color="textSecondary"
                underline="always"
              >
                <li>{item.title}</li>
              </LinkUi>
            </Link>
          ))}
        </ol>

        <Card variant="outlined" className={classes.card}>
          <CardActionArea component="a" className={classes.cardMedia}>
            <Link passHref href="/resources/[resourceSlug]/items/[itemId]" as={`/resources/${resource.slug}/items/${resource.content[0].id}`}>

              <CardContent>
                <Grid container justify="space-between" direction="row">
                  <Typography color="textSecondary">
                    Start here!
                    {' '}
                    <LinkUi
                      underline="always"
                      className={classes.link}
                      component="span"
                      variant="subtitle1"
                    >
                      {resource.content[0].title}
                    </LinkUi>
                  </Typography>
                  <ArrowForward />
                </Grid>
              </CardContent>
            </Link>
          </CardActionArea>

        </Card>
      </Box>
      <Box>
        <SignUpPrompt url="/" />
      </Box>
    </Box>
  );
};

ResourceContents.propTypes = {
  resource: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ResourceContents;
