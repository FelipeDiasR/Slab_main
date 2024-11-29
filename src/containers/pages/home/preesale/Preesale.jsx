import React, { useContext } from 'react';
import './preesale.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';

const Preesale = () => {
  const { isLigmode } = useContext(ThemeContext);
  return (
    <div className={`meow__preesale ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__preesale_container'>
      <h1>Participe dos nossos projetos</h1>
      <p>
        Envolva-se com os projetos da SlaB.Assets, invista em sustentabilidade <br/>   
        e ajude a transformar biodiversidade em impacto positivo para o planeta.
      </p>
        <div className='meow__preesale_buttons'>
          <Link to="/launchpad">
            <button className='meow__preesale_buttons_waitlist' type='button'>
              Comprar
            </button>
          </Link>
          <Link to="/launchpad">
            <button className='meow__preesale_buttons_htbuy' type='button'>
              Saiba mais
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preesale;
