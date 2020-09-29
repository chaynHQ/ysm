import {
  Avatar, Box,
  Card,

  CardActionArea, CardContent, makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SaveButton from './SaveButton';

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
  title, subtitle, image, slug, savingRedirectUrl,
}) => {
  const classes = useStyles();

  return (

    <Card variant="outlined">
      <Link href={`/resource/${slug}`}>
        <CardActionArea component="a" className={classes.cardMedia}>
          <CardContent>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box>
                <Typography variant="h2">
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
          </CardContent>
        </CardActionArea>
      </Link>
      <CardContent>
        <SaveButton resourceSlug={slug} redirectUrl={savingRedirectUrl} />
      </CardContent>
    </Card>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  slug: PropTypes.string.isRequired,
  savingRedirectUrl: PropTypes.string,
};

ResourceCard.defaultProps = {
  subtitle: '',
  image: null,
  savingRedirectUrl: null,
};

export default ResourceCard;
