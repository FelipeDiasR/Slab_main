import React, { useContext } from 'react';
import './tokenomics.css';
import Chart from '../../../../img/assets/logos/Graphic_flow.svg';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importação do hook de tradução

const Tokenomics = () => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook para tradução

  return (
    <div className={`meow__tokenomics ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__tokenomics_container'>
        <h1>{t('tbioGeneration.title')}</h1> {/* Título traduzido */}
        <p>{t('tbioGeneration.description')}</p> {/* Descrição traduzida */}
        
        <div className='meow__tokenomics_content'>
          <div className='meow__tokenomics_image'>
            <img src={Chart} alt="Chart" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tokenomics;
