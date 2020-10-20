import { Button, IconButton } from '@material-ui/core';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import { deleteBookmark, setBookmark } from '../store/actions';
import { axiosDelete, axiosPut } from '../store/axios';

const SaveButton = ({
  resourceSlug, redirectUrl, deleteBookmarkOnClick, setBookmarkOnClick, serverUser,
}) => {
  const router = useRouter();
  const [user] = useAuthState(firebase.auth());

  const saved = serverUser.bookmarkedResources
    && serverUser.bookmarkedResources.includes(resourceSlug);

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
                data: { resourceId: resourceSlug },
              }).then(deleteBookmarkOnClick(resourceSlug, user.xa));
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
              if (user) {
                axiosPut(`/profile/bookmarks/resources/${resourceSlug}`, { resourceId: resourceSlug }, {
                  headers: {
                    authorization: `Bearer ${user.xa}`,
                  },
                }).then(setBookmarkOnClick(resourceSlug, user.xa));
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
  serverUser: PropTypes.objectOf(PropTypes.any).isRequired,
  setBookmarkOnClick: PropTypes.func.isRequired,
  deleteBookmarkOnClick: PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
  redirectUrl: null,
};

const mapStateToProps = (state) => ({
  serverUser: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBookmarkOnClick: (slug, token) => dispatch(deleteBookmark(slug, token)),
  setBookmarkOnClick: (slug, token) => dispatch(setBookmark(slug, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
