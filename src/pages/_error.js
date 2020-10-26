import PropTypes from 'prop-types';
import React from 'react';
import Rollbar from 'rollbar';

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server!`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ req, res, err }) => {
  let statusCode;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  } else {
    statusCode = 404;
  }

  // Only require Rollbar and report error if we're on the server & it's not a local 404.
  if (!process.browser && statusCode !== 404) {
    const rollbar = new Rollbar({
      accessToken: process.env.NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      enabled: (process.env.NODE_ENV === 'production'),
    });
    rollbar.error(err, req);
  }
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default Error;
