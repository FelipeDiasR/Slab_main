// src/components/LoadingPopup.jsx
import React from 'react';
import '../approved/approved.css'; // Arquivo CSS para estilização
import denied from '../../img/icons/denied.svg'



function Denied () {

  return (
    <div className="approved-popup">
      <div className="approved-popup-content">
        <img src={denied} alt='denied' />
        <p> A transação falhou, entre<br/> em contato com a Slab.</p>
      </div>
    </div>
  );
};

export default Denied;
