import { useState, useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

function getWindowDimensions() {
  let { innerWidth: width, innerHeight: height } = isBrowser ? window : {};

  // if width or height doesn't exist, send 0
  // if (!width || !height) {
  //   width = 0;
  //   height = 0;
  // }

  // if width > 752, send width: 752
  if (width > 752) {
    width = 752;
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
