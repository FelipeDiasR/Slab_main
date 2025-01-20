import React, { useEffect, useContext } from 'react';

import { Outlet } from 'react-router-dom';
import { initGA, logPageView } from './analytics';

import RouteTrack from './components/tracker/RouteTracker.jsx';
import { ThemeContext } from './components/themecontext/ThemeContext.jsx';

import './App.css';



import { Navbar } from './components';
import { Footer, ScrollTop } from './components';
import {WalletProvider} from './components/wallet/Walletcontext.jsx';
import './i18n';

  

const App = () => {
  const { isLigmode } = useContext(ThemeContext); // Acessa o estado do tema

  useEffect(() => {
    initGA();
    logPageView();
    window.addEventListener('popstate', logPageView);
    return () => {
      window.removeEventListener('popstate', logPageView);
    };
  }, []);

  return (
    <div className={`App ${isLigmode ? 'light-mode' : 'dark-mode'}`}>  
      <WalletProvider>
        <RouteTrack /> 
        <Navbar />
        <ScrollTop />
        <Outlet />  
        <Footer />
      </WalletProvider>   
    </div>
  )
}

export default App;