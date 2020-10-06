import { Button, IconButton } from '@material-ui/core';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookmark, setBookmark } from '../store/actions';

const SaveButton = ({ resourceSlug, redirectUrl }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const saved = user.bookmarkedResources && user.bookmarkedResources.includes(resourceSlug);

  return (
    <>
      {saved
        ? (
          <IconButton
            onClick={() => {
              dispatch(deleteBookmark(resourceSlug, user.xa));
            }}
          >
            <Bookmark color="error" />
          </IconButton>
        )
        : (
          <Button
            variant="outlined"
            disableElevation
            size="small"
            startIcon={<BookmarkBorder />}
            onClick={() => {
              if (user.xa) {
                dispatch(setBookmark(resourceSlug, user.xa));
              } else {
                router.push(`/sign-in?redirectUrl=${redirectUrl}`, '/sign-in');
              }
            }}
          >
            Save for later
          </Button>
        )}
    </>
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
