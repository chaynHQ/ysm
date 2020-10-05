import { Button } from '@material-ui/core';
import { BookmarkBorder } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { axiosPut } from '../store/axios';

const SaveButton = ({ resourceSlug, redirectUrl }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  // TODO: Unsaving
  return (
    <Button
      variant="outlined"
      disableElevation
      size="small"
      startIcon={<BookmarkBorder />}
      onClick={() => {
        if (user.xa) {
          axiosPut(`/profile/bookmarks/resources/${resourceSlug}`, { currentUserId: user.xa, resourceId: resourceSlug }, {
            headers: {
              authorization: `Bearer ${user.xa}`,
            },
          });
        } else {
          router.push(`/sign-in?redirectUrl=${redirectUrl}`, '/sign-in');
        }
      }}
    >
      Save for later
    </Button>

  );
};

SaveButton.propTypes = {
  resourceSlug: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
};

SaveButton.defaultProps = {
  redirectUrl: null,
};

export default SaveButton;
