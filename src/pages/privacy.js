import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import StaticPage from '../components/StaticPage';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';

const Privacy = ({ propContent }) => {
  const previewMode = useSelector((state) => state.user.previewMode);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [content, setContent] = useState(propContent);

  useEffect(() => {
    if (previewMode) {
      axiosGet('pages/privacy', {
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
    propContent = await axiosGet('pages/privacy');
  }

  return { props: { propContent } };
}

Privacy.propTypes = {
  propContent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Privacy;
