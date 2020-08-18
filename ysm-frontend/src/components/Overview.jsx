import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  makeStyles, Grid, Typography, Box,
} from '@material-ui/core';

import illustration from '../assets/resource-illustration.png';

import Header from './Header';
import Footer from './Footer';

import { fetchThemes, fetchResources } from '../store/actions';

const useStyles = makeStyles({
  container: {
    height: '100%',
  },
  illustration: {},
});

const Overview = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  // setLoading(false);

  useEffect(() => {
    if (props.themes.length > 0 && props.resources.length > 0) {
      setLoading(false);
    } else if (props.themes.length <= 0) {
      props.fetchThemes();
    } else if (props.resources.length <= 0) {
      props.fetchResources();
    }
  });

  // TODO: STYLING

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={1}
      justifyContent="space-between"
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Typography>“Quote to show we understand”</Typography>
      <Typography>Take a look at what we’ve got for you.</Typography>
      <Box>
        <Typography>User</Typography>
      </Box>
    </Box>
  );
};

// {loading ? (
//   <CircularProgress />
// ) : (
//   props.themes.map((theme) => {
//     return (
//       <Box key={theme.id} bgcolor="primary.main" color="secondary.main">
//         <Typography>{theme.title}</Typography>
//         {ReactHtmlParser(theme.description)}
//         <Box flexDirection="row">
//           {props.resources
//             .filter(
//               (resource) => resource.themes && resource.themes.includes(theme.id)
//             )
//             .map((resource) => {
//               return (
//                 <Box key={resource.id}>
//                   <img
//                     src={illustration}
//                     alt="Illustration of person walking"
//                     width={'30%'}
//                   />
//                   <Typography>{resource.title}</Typography>
//                 </Box>
//               );
//             })}
//         </Box>
//       </Box>
//     );
//   })
// )}

const mapStateToProps = (state) => ({
  themes: state.themes,
  resources: state.resources,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThemes: () => dispatch(fetchThemes()),
  fetchResources: () => dispatch(fetchResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
