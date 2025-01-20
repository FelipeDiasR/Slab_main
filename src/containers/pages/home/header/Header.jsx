import React, { useContext } from 'react';
import './header.css';
import LogoGreen from '../../../../img/assets/header/logo_big_postiva.svg';
import LogoBlue from '../../../../img/assets/header/Logo_big_negativa.svg';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importação do hook de tradução

const Header = () => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook para traduzir textos

  return (
    <div className={`meow__header ${isLigmode ? 'lightmode' : ''}`} id="home">
      <div className="meow_header_container">
        <div className="meow__header_content">
          <h1 className="gradient_text">
            {t('header.title')} {/* Título traduzido */}
          </h1>
          <p>
            {t('header.description')} {/* Descrição traduzida */}
          </p>
          <div className="meow__header_buttons">
            <div className="meow__header_buttons-button1">
              <Link to={`/launchpad`}>
                <button>{t('header.buy')}</button> {/* Botão traduzido */}
              </Link>
            </div>
            <div className="meow__header_buttons-button2">
              <Link to={`/launchpad`}>
                <button>{t('header.learnMore')}</button> {/* Botão traduzido */}
              </Link>
            </div>
          </div>
        </div>
        <div className="meow__header-img">
          <img src={isLigmode ? LogoBlue : LogoGreen} alt="LOGO" />
        </div>
      </div>
    </div>
  );
};

export default Header;
