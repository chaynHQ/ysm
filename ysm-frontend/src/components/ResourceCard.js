import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Button,
} from '@material-ui/core';
import {
  BookmarkBorder,
} from '@material-ui/icons';

import Link from 'next/link';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: '100%',
  },
  avatar: {
    height: '70px',
    width: '70px',
  },
}));

const ResourceCard = ({
  title, subtitle, image, slug,
}) => {
  const classes = useStyles();

  return (

    <Card variant="outlined">
      {/* TODO: Make this the right link */}
      <Link href={`/resource/${slug}`}>
        <CardActionArea component="a" className={classes.cardMedia}>
          <CardContent>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box>
                <Typography variant="h2" className={classes.title}>
                  {title}
                </Typography>
                <Typography>
                  {subtitle}
                </Typography>
              </Box>
              <Box>
                {image
                  ? (
                    <Avatar
                      alt={image.alt}
                      src={image.filename}
                      className={classes.avatar}
                    />
                  )
                  : null}
              </Box>
            </Box>
            <Button className={classes.button} variant="outlined" disableElevation size="small" startIcon={<BookmarkBorder />}>Save for later</Button>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  slug: PropTypes.string.isRequired,
};

ResourceCard.defaultProps = {
  subtitle: '',
  image: null,
};

export default ResourceCard;
