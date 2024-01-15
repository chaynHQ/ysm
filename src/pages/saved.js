import {
  Box, Card, CardActionArea, CardContent, makeStyles, Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { AccountCircle } from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import ResourceCard from '../components/ResourceCard';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import { setBookmark } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.error.main,
  },
}));

const Saved = ({ profile, setBookmarkOnRender }) => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState([]);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

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
        setBookmarkOnRender(bookmarkSlug);
      });
    };
    if (user) {
      getServerBookmarkData();
    }
  }, [user]);

  useEffect(() => {
    const getResourceData = async (slug) => {
      const resource = await axiosGet(`resources/${slug}`);
      return resource;
    };

    const getBookmarkData = async () => {
      const promises = profile.bookmarkedResources.map(async (b) => {
        const res = await getResourceData(b);
        return res;
      });

      const tempBookmarks = await Promise.all(promises);
      setBookmarks(tempBookmarks);

      return tempBookmarks;
    };

    if (user && profile.bookmarkedResources) {
      getBookmarkData();
    }
  }, [user, profile]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      alignItems="center"
    >

      { user
        ? (
          <Box width={1} bgcolor="#FFEAE3">
            <Box display="flex" justifyContent="space-between" width={1} px={3} pt={2}>
              <Link href="/settings" passHref>
                <LinkUi component="a" color="textSecondary">
                  <Box display="flex" alignItems="center">
                    <AccountCircle className={classes.icon} />
                    My Account
                  </Box>
                </LinkUi>
              </Link>
              <LinkUi
                color="textSecondary"
                onClick={() => {
                  firebase.auth().signOut();
                  setBookmarks([]);
                  axiosGet('/preview', {
                    params: {
                      revokeAccess: true,
                    },
                  });
                }}
              >
                Log out
              </LinkUi>
            </Box>
          </Box>
        )
        : null }
      <Box
        width={1}
        pt={3.5}
        px={2}

      >
        <Typography variant="h1" align="center">Saved for Later</Typography>
        <Typography variant="h3">
          { user && bookmarks.length < 1 ? "You haven't saved any resources yet!" : null }
          {' '}
        </Typography>

        { user && bookmarks.length < 1 ? (
          <Typography variant="h3">
            Start exploring:
            {' '}
            <Link href="/your-journey">
              <LinkUi
                underline="always"
                className={classes.link}
              >
                Your Journey
              </LinkUi>
            </Link>
          </Typography>
        )
          : bookmarks.map((resource) => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              title={resource.title}
              subtitle={resource.subtitle}
              image={resource.image}
              slug={resource.slug}
              savingRedirectUrl="/saved"
            />
          )) }

        {!user
          ? (
            <Card variant="outlined" className={classes.card}>
              <Link href="/sign-in">
                <CardActionArea component="a">
                  <CardContent>
                    <Typography color="textSecondary">
                      <LinkUi
                        underline="always"
                        className={classes.link}
                      >
                        Sign up for an account or Sign in
                      </LinkUi>
                      {' '}
                      to start saving resources.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          )
          : null }

      </Box>

    </Box>
  );
};

Saved.propTypes = {
  profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setBookmarkOnRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setBookmarkOnRender: (slug) => dispatch(setBookmark(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
