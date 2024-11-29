// src/RouteTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../../analytics';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

export default RouteTracker;
