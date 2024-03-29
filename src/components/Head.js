import NextHead from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import isBrowser from '../shared/browserCheck';

const Head = ({ title, description, ogDescription, ogImage, ogTitle, ogImageAlt }) => (
  <NextHead>
    <title key="title">{title} | YSM</title>
    <link rel="icon" href="/favicon.png" />
    <meta name="description" content={description} />
    <meta property="og:url" content={isBrowser ? window.location.href : null} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="YSM" />
    <meta name="twitter:title" content={ogTitle || title} />
    <meta name="twitter:description" content={ogDescription || description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={ogImageAlt} />
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImageAlt: PropTypes.string,
};

Head.defaultProps = {
  ogTitle: null,
  description:
    'Browse accessible resources curated by a team of survivors. Save what you love and come back anytime.',
  ogDescription: null,
  ogImage: '/logo.png',
  ogImageAlt: 'Line drawing',
};

export default Head;
