import PropTypes from 'prop-types';
import React from 'react';
import StaticPage from '../components/StaticPage';
import { axiosGet } from '../store/axios';

const Privacy = ({ content }) => (
  <StaticPage content={content} />
);

export async function getServerSideProps() {
  const content = await axiosGet('pages/privac');

  return { props: { content } };
}

Privacy.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Privacy;
