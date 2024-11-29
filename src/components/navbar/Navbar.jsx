import React, { useState, useContext } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { WiSolarEclipse } from "react-icons/wi";
import { FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';

import logotipo_white_block from '../../img/assets/logos/slab_greenlogo.svg';
import logotipo_positive_block from '../../img/assets/logos/slab_greenlogo.svg';
import './navbar.css';
import { useWallet } from '../wallet/Walletcontext';
import { ThemeContext } from '../themecontext/ThemeContext';

// Componente Menu, onde os itens do menu e o botão de tema são definidos
const Menu = ({ toggleTheme, isLigmode, closeMenu }) => (
  <ul>
    <li>
      <Link to="/launchpad">Lançamentos</Link>
    </li>
    <li>
      <a href="https://meowl-1.gitbook.io/meowlverse-whitepaper/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
      contato
      </a>
    </li>
    
    <li>
      {/* Botão de alternância de tema adicionado aqui */}
      <button onClick={toggleTheme} className="color-mode-toggle">
        {isLigmode ? <WiSolarEclipse /> : <FaMoon />} {/* Ícone condicional */}
        {isLigmode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </li>
  </ul>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false); 
  const { account, connectWallet } = useWallet();
  const { isLigmode, toggleTheme } = useContext(ThemeContext); // Utiliza o ThemeContext

  return (
    <div className={`meow__navbar ${isLigmode ? 'light-mode' : ''}`}>
      <div className='meow__navbar_logo'>
        <Link to="/"><img src={isLigmode ? logotipo_white_block : logotipo_positive_block} alt='logotipo' /></Link>
      </div>
      <div className='meow__navbar_lightmode'>
        <button onClick={toggleTheme} className="color-mode-toggle">
          {isLigmode ? <WiSolarEclipse /> : <FaMoon />} {/* Ícone condicional */}
          {isLigmode ? 'Modo Escuro' : 'Modo Claro'}
        </button>
      </div>
      <div className='meow__navbar_whitepaper_wallet'>
        <Link to="/launchpad">Lançamentos</Link>
        <a href="https://forms.gle/niLDyFN1MhRRySmn9" target="_blank" rel="noopener noreferrer">
        contato
        </a>
        {account ? (
          <button>Connected: {account.slice(0, 6)}...{account.slice(-4)}</button>
        ) : (
          <button onClick={connectWallet}>Conectar carteira</button>
        )}
      </div>
      <div className='meow__navbar-menu'>
          {toggleMenu
            ? <RiCloseLine color={isLigmode ? '#000' : '#fff'} size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color={isLigmode ? '#000' : '#fff'} size={27} onClick={() => setToggleMenu(true)} />
          }
          {toggleMenu &&
            <div className='meow__navbar-menu_container scale-up-center'>
              <div className='meow__navbar-menu_container-links'>
                {/* Passando a função closeMenu para o Menu */}
                <Menu toggleTheme={toggleTheme} isLigmode={isLigmode} closeMenu={() => setToggleMenu(false)} />
              </div>
            </div>
          }
        </div>
    </div>
  );
};

export default Navbar;
