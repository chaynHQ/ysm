import NextHead from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const Head = ({
  title, description, ogDescription, ogImage, ogTitle,
}) => {
  const router = useRouter();
  return (
    <NextHead>
      <title>
        {title}
        {' '}
        | YSM
      </title>
      <meta name="description" content={description} />
      <meta property="og:url" content={`${process.env.BASE_URL} ${router.pathname}`} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="YSM" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Line drawing" />
    </NextHead>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  ogImage: PropTypes.string.isRequired,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
};

Head.defaultProps = {
  ogTitle: null,
  description: 'Browse accessible resources curated by a team of survivors. Save what you love and come back anytime.',
  ogDescription: null,
};

export default Head;
