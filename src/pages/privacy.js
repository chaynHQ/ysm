import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import StaticPage from '../components/StaticPage';
import firebase from '../config/firebase';
import isBrowser from '../shared/browserCheck';
import { axiosGet } from '../store/axios';

const Privacy = ({ propContent, previewMode }) => {
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [content, setContent] = useState(propContent);

  useEffect(() => {
    if (previewMode && user) {
      axiosGet('pages/privacy', {
        headers: {
          'X-PREVIEW-MODE': 'preview',
          authorization: `Bearer ${user.xa}`,
        },
      }).then((pageContent) => { setContent(pageContent); });
    }
  }, [user]);

  if (content) {
    return (<StaticPage content={content} />);
  }
  return null;
};

export async function getServerSideProps({ preview }) {
  let propContent = null;
  if (!preview) {
    propContent = await axiosGet('pages/privacy');
  }

  return { props: { propContent, previewMode: preview || false } };
}

Privacy.propTypes = {
  propContent: PropTypes.objectOf(PropTypes.any).isRequired,
  previewMode: PropTypes.bool,
};

Privacy.defaultProps = {
  previewMode: false,
};

export default Privacy;
