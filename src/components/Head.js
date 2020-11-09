import NextHead from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

const Head = ({
  title, ogImage, ogTitle,
}) => (
  <NextHead>
    <title>
      {title}
      {' '}
      | YSM
    </title>
    {/* <meta property="og:url" content={window.location.href} /> */}
    <meta property="og:title" content={ogTitle || title} />
    {/* CHECK THAT LOCAL IMAGE ACTUALY WORKS */}
    <meta property="og:image" content={ogImage} />
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  ogImage: PropTypes.string.isRequired,
  ogTitle: PropTypes.string,
};

Head.defaultProps = {
  ogTitle: null,
};

export default Head;
