// Components/AnalyticsTracker.js
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

const AnalyticsTracker = () => {
  useEffect(() => {
    const handlePageView = () => {
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
    };

    handlePageView(); // Track the initial page view

    // Add a listener for popstate events to handle back/forward navigation
    window.addEventListener('popstate', handlePageView);

    return () => {
      window.removeEventListener('popstate', handlePageView);
    };
  }, []);

  return null;
};

export default AnalyticsTracker;
