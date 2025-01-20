import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router DOM
import './brand.css';
import Foguete from '../../../../img/assets/brand/tbio_img.svg';
import Game from '../../../../img/assets/brand/tokenization_img.svg';
import Staking from '../../../../img/assets/brand/certificate_img.svg';

import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importação do hook de tradução

const Brand = () => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook para tradução

  return (
    <div className={`meow__brand ${isLigmode ? 'lightmode' : ''}`}> 
      <div className='meow__brand_container'>
        <div className='meow__brand_title'>
          <h1>{t('services.title')}</h1> {/* Título traduzido */}
        </div>
        <div className='meow__brand_content_launch'>
          <div className="meow__header_img_foguete">
            <Link to="/launchpad"><img src={Foguete} alt="image2" /></Link>
          </div>
          <div className='meow__brand_lauchpad'>
             <h2>{t('services.biodiversityAssets.title')}</h2> {/* Subtítulo traduzido */}
              <p>{t('services.biodiversityAssets.description')}</p> {/* Descrição traduzida */}
          </div>
        </div>
        <div className='meow__brand_content_gaming'>
          <div className='meow__brand_gaming'>
            <Link to="/game">
              <h2>{t('services.tokenization.title')}</h2> {/* Subtítulo traduzido */}
              <p>{t('services.tokenization.description')}</p> {/* Descrição traduzida */}
            </Link>
          </div>
          <div className="meow__header_img_gaming">
            <Link to="/game"><img src={Game} alt="game" /></Link>
          </div>
        </div>

        <div className='meow__brand_content_launch'>
          <div className="meow__header_img_foguete">
            <img src={Staking} alt="Staking" />
          </div>
          <div className='meow__brand_lauchpad'>
            <h2>{t('services.deforestationFreeSeal.title')}</h2> {/* Subtítulo traduzido */}
            <p>{t('services.deforestationFreeSeal.description')}</p> {/* Descrição traduzida */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;
