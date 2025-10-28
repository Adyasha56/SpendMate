import { useState, useEffect } from 'react';

// Hook to detect screen size
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Predefined breakpoint hooks
export const useIsMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

export const useIsTablet = () => {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
};

export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1025px)');
};

// Get current screen size name
export const useScreenSize = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  return 'unknown';
};

// Hook for window dimensions
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};