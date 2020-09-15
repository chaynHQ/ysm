import React from 'react';
import PropTypes from 'prop-types';

import { axiosGet } from '../store/axios';

import StaticPage from '../components/StaticPage';

const Privacy = ({ content }) => (
  <StaticPage content={content} />
);

export async function getServerSideProps() {
  const content = await axiosGet('pages/privacy');

  return { props: { content } };
}

Privacy.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Privacy;
