import {
  Box, Card, CardActionArea, CardContent, makeStyles, Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { AccountCircle } from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ResourceCard from '../components/ResourceCard';
import { setSettingsAuth, setUserSignIn } from '../store/actions';
import { axiosGet } from '../store/axios';

const useStyles = makeStyles(() => ({
  link: {
    color: '#D27200',
  },
  card: {
    backgroundColor: '#ffffff',
  },
}));
const Saved = ({
  isSignedin, user, setUserSignInOnClick, setSettingsAuthOnError,
}) => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await axiosGet('/profile',
        {
          headers: {
            authorization: `Bearer ${user.xa}`,
          },
        });
      setBookmarks(userData.bookmarkedResources);
      return userData.bookmarkedResources;
    };
    if (isSignedin) {
      getUser();
    }
  }, []);

  console.log(bookmarks);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      alignItems="center"
    >

      { isSignedin
        ? (
          <Box display="flex" justifyContent="space-between" width={1} px={3} pt={2} bgcolor="#FFEAE3">
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
                setUserSignInOnClick({});
                setSettingsAuthOnError(false);
              }}
            >
              Log out
            </LinkUi>
          </Box>
        )
        : null }
      <Box
        pt={3.5}
        px={2}
      >
        <Typography variant="h1" align="center">Saved for Later</Typography>
        <Typography>
          { isSignedin && bookmarks.length < 1 ? "You haven't saved any resources yet!" : null }
          {' '}
        </Typography>

        { isSignedin && bookmarks.length < 1 ? (
          <Typography>
            Start exploring:
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
              id={resource.id}
              title={resource.title}
              subtitle={resource.subtitle}
              image={resource.image}
              slug={resource.slug}
            />
          )) }

        {!isSignedin
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
  setSettingsAuthOnError: PropTypes.func.isRequired,
  setUserSignInOnClick: PropTypes.func.isRequired,
  isSignedin: PropTypes.bool.isRequired.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  isSignedin: state.user ? Object.keys(state.user).length > 0 : false,
});

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnError: (bool) => dispatch(setSettingsAuth(bool)),
  setUserSignInOnClick: (user) => dispatch(setUserSignIn(user)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
