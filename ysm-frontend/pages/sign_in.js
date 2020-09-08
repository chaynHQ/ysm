import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';

import { setSettingsAuth } from '../store/actions';

const SignUpWidget = dynamic(
  () => import('../components/SignUpWidget'),
  { ssr: false },
);

const SignIn = ({ redirectUrl, setSettingsAuthOnSuccess }) => (
  <Box display="flex" flexDirection="column" height={1}>
    <SignUpWidget />
  </Box>
);
SignIn.propTypes = {
  redirectUrl: PropTypes.string,
  setSettingsAuthOnSuccess: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  redirectUrl: '',
};

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnSuccess: (bool) => dispatch(setSettingsAuth(bool)),
});

export default connect(null, mapDispatchToProps)(SignIn);
