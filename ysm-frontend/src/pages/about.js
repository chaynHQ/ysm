import React from 'react';
import PropTypes from 'prop-types';

import { axiosGet } from '../store/axios';

import StaticPage from '../components/StaticPage';

const About = ({ content }) => (
  <StaticPage content={content} />
);

export async function getServerSideProps() {
  const content = await axiosGet('pages/about-us');

  return { props: { content } };
}

About.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default About;
