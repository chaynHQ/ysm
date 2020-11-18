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

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: '100%',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  card: {
    margin: 6,
    backgroundColor: theme.palette.primary.light,
  },
}));

const ResourceCard = ({
  title, subtitle, image, slug, savingRedirectUrl,
}) => {
  const classes = useStyles();

  return (

    <Card className={classes.card}>
      <Link href="/resources/[resourceSlug]" as={`/resources/${slug}`}>
        <CardActionArea component="a" className={classes.cardMedia}>
          <CardContent>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box>
                <Typography variant="h2">
                  {title}
                </Typography>
                <Typography variant="h3">
                  {subtitle}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
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
