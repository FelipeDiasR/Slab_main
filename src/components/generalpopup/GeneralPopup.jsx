// src/components/GeneralPopup.jsx
import React, { useEffect, useRef, useState } from 'react';
import './generalpopup.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const GeneralPopup = ({ message, success, onClose }) => {
  const [visible, setVisible] = useState(true);
  const popupRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2000); // O popup desaparece após 5 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setVisible(false);
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisible(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`popup ${success ? 'success' : 'error'}`} ref={popupRef}>
      {success ? <FaCheckCircle /> : <FaTimesCircle />}
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default GeneralPopup;
