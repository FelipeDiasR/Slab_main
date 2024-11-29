import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from "react-ga4";


//import do react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import { Footer } from './containers';
import { Home, LaunchpadLanding, Project } from './pages';

import { ThemeProvider } from './components/themecontext/ThemeContext.jsx';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
     
      {
        path: "launchpad",
        element: <LaunchpadLanding />
      },
      {
        path: "project/:id",
        element: <Project />
      },
      
      

    ]
  },
]);
ReactGA.initialize("G-PW6YY2V9BC");
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

