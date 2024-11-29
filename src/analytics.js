// src/analytics.js
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-447208849-X'); // Substitua 'UA-XXXXXXXXX-X' pelo seu ID de rastreamento do Google Analytics
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
