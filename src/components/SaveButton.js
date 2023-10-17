import { Button, IconButton } from '@material-ui/core';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import { axiosDelete, axiosGet, axiosPut } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import { deleteBookmark, setBookmark } from '../store/actions';

const SaveButton = ({
  resourceSlug, redirectUrl, deleteUserBookmark, setUserBookmark, profile,
}) => {
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getServerBookmarkData = async () => {
      const idToken = await user.getIdToken();
      const serverProfile = await axiosGet('/profile',
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        });
      serverProfile.bookmarkedResources.forEach((bookmarkSlug) => {
        setUserBookmark(bookmarkSlug);
      });
    };

    if (profile.bookmarkedResources
    && profile.bookmarkedResources.includes(resourceSlug)) {
      setSaved(true);
    } else if (!profile.bookmarkedResources && user) {
      getServerBookmarkData();
    }
  }, [user, profile]);

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
                setSaved(false);
                deleteUserBookmark(resourceSlug);

                firebase.analytics()?.logEvent('remove_bookmark', {
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
                  setUserBookmark(resourceSlug);

                  firebase.analytics()?.logEvent('add_bookmark', {
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
  profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setUserBookmark: PropTypes.func.isRequired,
  deleteUserBookmark: PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
  redirectUrl: null,
};

const mapStateToProps = (state) => ({
  profile: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUserBookmark: (slug) => dispatch(deleteBookmark(slug)),
  setUserBookmark: (slug) => dispatch(setBookmark(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
