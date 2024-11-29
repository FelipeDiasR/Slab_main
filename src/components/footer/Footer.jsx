import React, { useContext } from 'react';
import './footer.css';

import logotipo_white_block from '../../img/assets/logos/slab_blacklogo.svg';
import logotipo_positive_block from '../../img/assets/logos/slab_greenlogo.svg';
import Division from '../../img/division.svg';

//import { FaTwitter, FaTelegram, FaInstagram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../themecontext/ThemeContext';

const Footer = () => {

  const { isLigmode } = useContext(ThemeContext);
  return (
    <div className={`meow__footer ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__footer_links'>
        <div className='meow__footer-logo'>
        <Link to="/"><img src={isLigmode ? logotipo_white_block : logotipo_positive_block} alt='logotipo' /></Link>
          <h3>Blockchain Tokenization.</h3>
        </div>
        {/*
        <div className='meow__footer_firstcolun'>
          <h4>Seu Texto</h4>
          <Link to="/game" className="link">
          <p>Seu Texto</p>
          </Link>
          <Link to="/launchpad" className="link">
          <p>Seu Texto</p>
          </Link>
        </div>
        <div className='meow__footer_secondcolun'>
          <h4>Seu Texto</h4>
          <Link to="/launchpad" className="link">
          <p>Seu Texto</p>
          </Link>
          <a href="https://meowl-1.gitbook.io/meowlverse-whitepaper/" target="_blank" rel="noopener noreferrer">
          <p>Seu Texto</p>  
          </a>
          <Link to="/launchpad" className="link">
          <p>Seu Texto</p>
          </Link>
          <a href="https://meowl-1.gitbook.io/meowlverse-whitepaper/roadmap" target="_blank" rel="noopener noreferrer">
          <p>Seu Texto</p>
          </a>
          
        </div>
        */}
        <div className='meow__footer_division'>
          <img src={Division} alt='division'/>
        </div>
        <div className='meow__footer_copyright'>
          <p>©2021 Bloxifi. All rights reserved.</p>
          <ul className='meow__footer_sociallist'>
            <li>
            <a href="https://x.com/MeowlVerse" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram />
              </a>
            </li>
            <li>
            <a href="https://t.me/+riHQZk6L02I4ODNh" target="_blank" rel="noopener noreferrer">
              <TfiWorld />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
