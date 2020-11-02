import {
  Box, Card, CardContent, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import Iframe from 'react-iframe';

const useStyles = makeStyles(() => ({
  iframe: {
    borderWidth: 0,
  },
}));

const NewsletterSignup = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3.5}
      px={2}
      alignItems="center"
    >

      <Card>
        <CardContent>
          <Typography align="center" variant="h2">YSM Newsletter</Typography>
          <Typography align="center"> I want to receive emails when new content is available on YSM.</Typography>
          <Iframe
            url="https://yourstorymatters.substack.com/embed"
            width="100%"
            className={classes.iframe}
          />
        </CardContent>
      </Card>

    </Box>
  );
};

export default NewsletterSignup;
