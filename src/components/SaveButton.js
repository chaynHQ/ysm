import { Button, IconButton } from '@material-ui/core';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteBookmark, setBookmark } from '../store/actions';
import { axiosDelete, axiosPut } from '../store/axios';

const SaveButton = ({
  resourceSlug, redirectUrl, user, isSignedIn, deleteBookmarkOnClick, setBookmarkOnClick,
}) => {
  const router = useRouter();

  const saved = user.bookmarkedResources && user.bookmarkedResources.includes(resourceSlug);

  return (
    <>
      {saved
        ? (
          <IconButton
            onClick={() => {
              axiosDelete(`/profile/bookmarks/resources/${resourceSlug}`, {
                headers: {
                  authorization: `Bearer ${user.xa}`,
                },
                data: { currentUserId: user.xa, resourceId: resourceSlug },
              });
              deleteBookmarkOnClick(resourceSlug, user.xa);
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
              if (isSignedIn) {
                axiosPut(`/profile/bookmarks/resources/${resourceSlug}`, { currentUserId: user.xa, resourceId: resourceSlug }, {
                  headers: {
                    authorization: `Bearer ${user.xa}`,
                  },
                });
                setBookmarkOnClick(resourceSlug, user.xa);
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  setBookmarkOnClick: PropTypes.func.isRequired,
  deleteBookmarkOnClick: PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
  redirectUrl: null,
};

const mapStateToProps = (state) => ({
  user: state.user,
  isSignedIn: state.user ? Object.keys(state.user).length > 0 : false,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBookmarkOnClick: (slug, token) => dispatch(deleteBookmark(slug, token)),
  setBookmarkOnClick: (slug, token) => dispatch(setBookmark(slug, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
