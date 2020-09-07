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
  card: {
    margin: 6,
  },
  cardMedia: {
    height: '100%',
  },
  avatar: {
    height: '70px',
    width: '70px',
  },
  button: {
    fontSize: '12px',
  },
}));

const ResourceCard = ({
  title, subtitle, image,
}) => {
  const classes = useStyles();

  return (

    <Card className={classes.card}>
      {/* TODO: MAke this the right link */}
      <Link href="/your-journey">
        <a>
          <CardActionArea className={classes.cardMedia}>
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
              <Button className={classes.button} color="secondary" variant="contained" disableElevation size="small" startIcon={<BookmarkBorder />}>Save for later</Button>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

ResourceCard.defaultProps = {
  subtitle: '',
  image: null,
};

export default ResourceCard;
