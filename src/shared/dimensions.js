import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import isBrowser from './browserCheck';

function getWindowDimensions() {
  let { innerWidth: width, innerHeight: height } = isBrowser ? window : {};

  if (width > 752 && !isMobile) {
    width = 752;
  }

  if (height > 731 && !isMobile) {
    height = 731;
  }

  return { width, height };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
