import React, { useContext } from 'react';
import './partners.css';
import { Base, mwol, Pollygon } from '../../../../img/partners/imports';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { useTranslation } from 'react-i18next';


function Partners() {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook para tradução


  return (
    <div className={`meow__partners ${isLigmode ? 'lightmode' : ''}`}>
      <h2>{t('Partners.title')}</h2> 
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
