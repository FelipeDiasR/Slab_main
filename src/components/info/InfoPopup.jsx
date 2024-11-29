import React, { useEffect, useRef } from 'react';
import './info.css';

const InfoPopup = ({ show, onClose, title, content }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleCloseOnOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleCloseOnEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleCloseOnEsc);
      document.addEventListener('mousedown', handleCloseOnOutsideClick);
    } else {
      document.removeEventListener('keydown', handleCloseOnEsc);
      document.removeEventListener('mousedown', handleCloseOnOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleCloseOnEsc);
      document.removeEventListener('mousedown', handleCloseOnOutsideClick);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="info-popup">
      <div ref={popupRef} className="info-popup-content">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InfoPopup;
