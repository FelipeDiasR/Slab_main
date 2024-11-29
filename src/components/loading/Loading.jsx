// src/components/LoadingPopup.jsx
import React from 'react';
import './loading.css'; // Arquivo CSS para estilização
import load from '../../img/icons/load.svg'



function Loading () {

  return (
    <div className="loading-popup">
      <div className="loading-popup-content">
        <img src={load} alt='loading' />
        <p> Loading your trasaction..</p>
      </div>
    </div>
  );
};

export default Loading;
