import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid, makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowForward, BookmarkBorder } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import richTextHelper from '../shared/rich-text';
import SignUpPrompt from './SignUpPrompt';

const useStyles = makeStyles(() => ({
  link: {
    color: '#D27200',
  },
  card: {
    backgroundColor: '#ffffff',
  },
}));

const ResourceContents = ({ resource }) => {
  const classes = useStyles();
  const router = useRouter();

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
      <Button variant="outlined" disableElevation size="small" startIcon={<BookmarkBorder />}>Save for later</Button>
      <Typography component={Box} color="textSecondary">
        {richTextHelper(resource.description)}
      </Typography>
      <Box width={1}>
        <Typography variant="h2" align="left">Start Exploring</Typography>
        <ol>
          {resource.content.map((item) => (
            <LinkUi color="textSecondary" key={item.id} underline="always" href={`/resource/${router.query.resourceSlug}/item/${item.id}`}><li>{item.title}</li></LinkUi>
          ))}
        </ol>

        <Card variant="outlined" className={classes.card}>
          <Link href={`/resource/${router.query.resourceSlug}/item/${resource.content[0].id}`}>
            <CardActionArea component="a" className={classes.cardMedia}>
              <CardContent>
                <Grid container justify="space-between" direction="row">
                  <Typography color="textSecondary">
                    Start here:
                    <LinkUi
                      underline="always"
                      className={classes.link}
                    >
                      {resource.content[0].title}
                    </LinkUi>
                  </Typography>
                  <ArrowForward />
                </Grid>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </Box>
      <SignUpPrompt url="/" />
    </Box>
  );
};

ResourceContents.propTypes = {
  resource: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResourceContents;
