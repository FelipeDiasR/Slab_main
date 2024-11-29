import React, { useContext } from 'react';
import './partners.css';
import { Base, mwol, Pollygon } from '../../../../img/partners/imports';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';


function Partners() {
  const { isLigmode } = useContext(ThemeContext);


  return (
    <div className={`meow__partners ${isLigmode ? 'lightmode' : ''}`}>
      <h2>Parceiros</h2> 
      <div className='meow__partners_container'>  
        <div className='meow__partner_image'>
          <img src={Base} alt="Pollygon" />
        </div>
        <div className='meow__partner_image'>
          <img src={Pollygon} alt="Base" />
        </div>
        <div className='meow__partner_image'>
          <img src={mwol} alt="MeowlVerse" />
        </div>
      </div>
    </div>
  )
}

export default Partners;
