import React, { useState, useContext } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { WiSolarEclipse } from "react-icons/wi";
import { FaMoon } from "react-icons/fa";
import { FaFlagUsa } from "react-icons/fa"; // Bandeira dos EUA
import { GiBrazilFlag } from "react-icons/gi"; // Bandeira do Brasil
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logotipo_white_block from '../../img/assets/logos/slab_greenlogo.svg';
import logotipo_positive_block from '../../img/assets/logos/slab_greenlogo.svg';
import './navbar.css';
import { useWallet } from '../wallet/Walletcontext';
import { ThemeContext } from '../themecontext/ThemeContext';

// Componente do Menu (Mobile)
const Menu = ({ toggleTheme, isLigmode, closeMenu, changeLanguage, currentLang }) => (
  <ul>
    <li>
      <Link to="/launchpad" onClick={closeMenu}>Lançamentos</Link>
    </li>
    <li>
      <a href="https://forms.gle/7GAt424sNFooMk1r7" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
        Contato
      </a>
    </li>
    <li>
      <button onClick={toggleTheme} className="color-mode-toggle">
        {isLigmode ? <WiSolarEclipse /> : <FaMoon />}
        {isLigmode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </li>
    <li>
      {/* Ícone de troca de idioma no menu mobile */}
      <button
        className="current-language"
        onClick={() => changeLanguage(currentLang === 'pt' ? 'en' : 'pt')}
      >
        {currentLang === 'pt' ? <GiBrazilFlag title="Switch to English" /> : <FaFlagUsa title="Mudar para Português" />}
      </button>
    </li>
  </ul>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false); 
  const { account, connectWallet } = useWallet();
  const { isLigmode, toggleTheme } = useContext(ThemeContext); 
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setToggleMenu(false); // Fecha o menu no mobile após selecionar
  };

  const currentLang = i18n.language;

  return (
    <div className={`meow__navbar ${isLigmode ? 'light-mode' : ''}`}>
      <div className='meow__navbar_logo'>
        <Link to="/"><img src={isLigmode ? logotipo_white_block : logotipo_positive_block} alt='logotipo' /></Link>
      </div>
      <div className='meow__navbar_lightmode'>
        <button onClick={toggleTheme} className="color-mode-toggle">
          {isLigmode ? <WiSolarEclipse /> : <FaMoon />}
          {isLigmode ? t('navbar.darkMode') : t('navbar.lightMode')}
        </button>
      </div>
      <div className='meow__navbar_whitepaper_wallet'>
        <Link to="/launchpad">{t('navbar.launches')}</Link>
        <a href="https://somasustentabilidade.com.br/calculadora/" target="_blank" rel="noopener noreferrer">
          {t('navbar.calculator')}
        </a>
        <a href="https://forms.gle/7GAt424sNFooMk1r7" target="_blank" rel="noopener noreferrer">
          {t('navbar.contact')}
        </a>

        <div className="language-selector">
          <button
            className="current-language"
            onClick={() => changeLanguage(currentLang === 'pt' ? 'en' : 'pt')}
          >
            {currentLang === 'pt' ? <GiBrazilFlag title="Switch to English" /> : <FaFlagUsa title="Mudar para Português" />}
          </button>
          
        </div>
        {account ? (
          <button>Connected: {account.slice(0, 6)}...{account.slice(-4)}</button>
        ) : (
          <button onClick={connectWallet}>{t('navbar.connectWallet')}</button>
        )}
        {/* Ícone de troca de idioma para desktop */}
        
      </div>

      {/* Menu responsivo */}
      <div className='meow__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color={isLigmode ? '#000' : '#fff'} size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color={isLigmode ? '#000' : '#fff'} size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='meow__navbar-menu_container scale-up-center'>
            <div className='meow__navbar-menu_container-links'>
              {/* Passa as funções para o menu */}
              <Menu
                toggleTheme={toggleTheme}
                isLigmode={isLigmode}
                closeMenu={() => setToggleMenu(false)}
                changeLanguage={changeLanguage}
                currentLang={currentLang}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
