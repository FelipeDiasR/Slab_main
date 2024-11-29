// src/components/LoadingPopup.jsx
import React from 'react';
import './denied.css'; // Arquivo CSS para estilização
import denied from '../../img/icons/denied.svg'



function Denied () {

  return (
    <div className="denied-popup">
      <div className="denied-popup-content">
        <img src={denied} alt='denied' />
        <p> The Transaction has been denied..</p>
      </div>
    </div>
  );
};

export default Denied;
