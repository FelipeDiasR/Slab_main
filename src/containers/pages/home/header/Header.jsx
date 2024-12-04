import React, { useContext } from 'react';
import './header.css';
import LogoGreen from '../../../../img/assets/header/logo_big_postiva.svg';
import LogoBlue from '../../../../img/assets/header/Logo_big_negativa.svg';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';

const Header = () => {
  const { isLigmode } = useContext(ThemeContext);

  return (
    <div className={`meow__header ${isLigmode ? 'lightmode' : ''}`} id="home">
      <div className="meow_header_container">
        <div className="meow__header_content">
          <h1 className="gradient_text">
            Sustentabilidade,<br />
            Biodiversidade<br />
            e Blindagem.

            
          </h1>
          <p>
          A SlaB Assets é pioneira na tokenização de ativos de biodiversidade, promovendo
          a conservação ambiental . Os ativos de biodiversidade, tem como unidade métrica
          o CO2,  o tCO2eq. (tonelada de dióxido de carbono equivalente),dentre outros 
          gases do efeito estufa presentes em toda biomassa, além de outros fatores 
          determinantes de um ecossistema, do subsolo a atmosfera. Oferecemos uma 
          plataforma em Web3 segura e transparente para aqueles que desejam investir no 
          futuro do planeta, preservando nossos ecossistemas e gerando impacto positivo.


          </p>
          <div className="meow__header_buttons">
            <div className="meow__header_buttons-button1">
              <Link to={`/details/01`}>
                <button>Comprar</button>
              </Link>
            </div>
            <div className="meow__header_buttons-button2">
              <Link to={`/launchpad`}>
                <button>Saiba mais</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="meow__header-img">
          <img src={ isLigmode ? LogoBlue : LogoGreen} alt="LOGO" />
        </div>
      </div>
    </div>
  );
};

export default Header;


//src={isLigmode ? logotipo_white_block : logotipo_positive_block}