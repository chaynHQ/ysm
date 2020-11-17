import { Button, IconButton } from '@material-ui/core';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import { axiosDelete, axiosPut } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import { deleteBookmark, setBookmark } from '../store/actions';

const SaveButton = ({
  resourceSlug, redirectUrl, deleteBookmarkOnClick, setBookmarkOnClick, profile,
}) => {
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const saved = profile.bookmarkedResources
    && profile.bookmarkedResources.includes(resourceSlug);

  // TODO: On Effect, if bookmarkedResources is empty, refresh it

  return (
    <>
      {saved
        ? (
          <IconButton
            onClick={async () => {
              const idToken = await user.getIdToken();
              axiosDelete(`/profile/bookmarks/resources/${resourceSlug}`, {
                headers: {
                  authorization: `Bearer ${idToken}`,
                },
                data: { resourceId: resourceSlug },
              }).then(() => {
                deleteBookmarkOnClick(resourceSlug);

                firebase.analytics().logEvent('remove_bookmark', {
                  content_type: 'resource',
                  item_id: resourceSlug,
                });
              });
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
            color="secondary"
            startIcon={<BookmarkBorder />}
            onClick={async () => {
              if (user) {
                const idToken = await user.getIdToken();
                axiosPut(`/profile/bookmarks/resources/${resourceSlug}`, { resourceId: resourceSlug }, {
                  headers: {
                    authorization: `Bearer ${idToken}`,
                  },
                }).then(() => {
                  setBookmarkOnClick(resourceSlug);

                  firebase.analytics().logEvent('add_bookmark', {
                    content_type: 'resource',
                    item_id: resourceSlug,
                  });
                });
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
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  setBookmarkOnClick: PropTypes.func.isRequired,
  deleteBookmarkOnClick: PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
  redirectUrl: null,
};

const mapStateToProps = (state) => ({
  profile: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBookmarkOnClick: (slug) => dispatch(deleteBookmark(slug)),
  setBookmarkOnClick: (slug) => dispatch(setBookmark(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
