import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import StaticPage from '../components/StaticPage';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';

const About = ({ propContent }) => {
  const previewMode = useSelector((state) => state.user.previewMode);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [content, setContent] = useState(propContent);

  useEffect(() => {
    if (previewMode) {
      axiosGet('pages/about-us', {
        headers: {
          'X-PREVIEW-MODE': 'preview',
          authorization: `Bearer ${user.xa}`,
        },
      }).then((pageContent) => { setContent(pageContent); });
    }
  }, []);

  if (content) {
    return (<StaticPage content={content} />);
  }
  return null;
};

export async function getServerSideProps({ preview }) {
  let propContent = null;
  if (!preview) {
    propContent = await axiosGet('pages/about-us');
  }

  return { props: { propContent } };
}

About.propTypes = {
  propContent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default About;
