import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'; // Hook de tradução
import ProjectLogo from '../../../../img/assets/logos/slab_greenlogo.svg';

//css
import './banner.css';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';

const Banner = () => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook de tradução

  return (
    <div className={`meow__banner  ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__banner_content'>
        <div className='meow__banner_text'>
          <h1>{t('banner.title')}</h1>
          <p>{t('banner.description')}</p>
        </div> 
        <div className='meow__banner_logo'>
          <img src={ProjectLogo} alt='projectlogo' />
        </div>
      </div>
      <div className="meow__banner__button">
        <a href="https://forms.gle/7GAt424sNFooMk1r7" target="_blank" rel="noopener noreferrer" className="meow__banner__link">
          {t('banner.button')}
        </a>
      </div>
    </div>
  );
}

export default Banner;
