import { useState } from 'react';
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // Adicionando um ícone de fechar
import './alert.css';

const Alert = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);  
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className='meow__alert'>
      <div className='meow__alert_header'>
        <LuAlertCircle className='meow__alert_icon' />
        <h1 className='meow__alert_title'>Sempre Tenha certeza que a URL é Bloxify.tech</h1>
        <MdClose className='meow__alert_icon_close' onClick={handleClose} />
      </div>
      <p className='meow__alert_message'>Tenha cuidado com links maliciosos</p>
    </div>
  );
}  

export default Alert;
