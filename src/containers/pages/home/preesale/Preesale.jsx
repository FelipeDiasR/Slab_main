import React, { useContext } from 'react';
import './preesale.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importação do hook de tradução

const Preesale = () => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook para tradução

  return (
    <div className={`meow__preesale ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__preesale_container'>
        <h1>{t('joinProjects.title')}</h1> {/* Título traduzido */}
        <p>{t('joinProjects.description')}</p> {/* Descrição traduzida */}
        <div className='meow__preesale_buttons'>
          <Link to="/launchpad">
            <button className='meow__preesale_buttons_waitlist' type='button'>
              {t('joinProjects.buttons.buy')} {/* Botão traduzido */}
            </button>
          </Link>
          <Link to="/launchpad">
            <button className='meow__preesale_buttons_htbuy' type='button'>
              {t('joinProjects.buttons.learnMore')} {/* Botão traduzido */}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preesale;
