// src/components/LoadingPopup.jsx
import React from 'react';
import './approved.css'; // Arquivo CSS para estilização
import approved from '../../img/icons/approved.svg'



function Approved () {

  return (
    <div data-testid="approved" className="approved-popup">
      <div  className="approved-popup-content">
        <img src={approved} alt='approved' />
        <p> The Transaction has been approved..</p>
        
      </div>
    </div>
  );
};

export default Approved; 
