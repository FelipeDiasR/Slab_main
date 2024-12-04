import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router DOM
import './brand.css';
import Foguete from '../../../../img/assets/brand/tbio_img.svg';
import Game from '../../../../img/assets/brand/tokenization_img.svg';
import Staking from '../../../../img/assets/brand/certificate_img.svg';

import { ThemeContext } from '../../../../components/themecontext/ThemeContext';

const Brand = () => {
  const { isLigmode } = useContext(ThemeContext);

  return (
    <div className={`meow__brand ${isLigmode ? 'lightmode' : ''}`}> 
      <div className='meow__brand_container'>
        <div className='meow__brand_title'>
          <h1>Serviços</h1>
        </div>
        <div className='meow__brand_content_launch'>
          <div className="meow__header_img_foguete">
            <Link to="/launchpad"><img src={Foguete} alt="image2" /></Link>
          </div>
          <div className='meow__brand_lauchpad'>
             <h2>Ativos de Biodiversidade</h2>
            
              <p>
              Conheça o Tbio, um token de biodiversidade lastreado em CPR-Verde e registrado em
              ambiente B3 (Brasil Bols Balcão). Capiturando valor da conservação florestal, o TBio 
              está em conformidade com o que determina a Lei nº 13.986/2020 , regulamentada pelo 
              Decreto nº 10.828/ 2021 , que introduziu na legislação Brasileira a possibilidade da 
              emissão de Cédula de Produto Rural lastreadas em ativos florestais/ambientais 
              (Ativos de Biodiversidade), normas e regras dos organismos nacionais e internacionais 
              como IPCC, WRI, GRI, GHG Protocol, ICR/CORSIA, ISO séries 14064 e 6000, ABNT NBR ISO 
              14064:2007-2, além das fórmulas de quantificação de CO2 e tCO2eq., metrificações, 
              desvio padrão e índices seguindo as normas, regras e padrões acadêmicos.
              </p>
          
          </div>
        </div>
        <div className='meow__brand_content_gaming'>
          <div className='meow__brand_gaming'>
            <Link to="/game"><h2>Tokenização e Blockchain</h2></Link>
            <Link to="/game"> 
              <p>
                Utilizamos tecnologia de ponta para tokenizar ativos de biodiversidade, 
                garantindo negociação segura e rastreável no blockchain. Essa inovação 
                permite criar unidades digitais fracionadas, facilitando sua comercialização 
                global com total transparência, segurança e rastreamento do impacto 
                positivo de cada investimento.
              </p>
            </Link>
          </div>
          <div className="meow__header_img_gaming">
            <Link to="/game"> <img src={Game} alt="game" /></Link>
          </div>
        </div>

        <div className='meow__brand_content_launch'>
          <div className="meow__header_img_foguete">
            <img src={Staking} alt="Staking" />
          </div>
          <div className='meow__brand_lauchpad'>
            <h2>Selo Livre de Desmatamento</h2>
            <p>
              Ao utilizar o TBio, clientes recebem o Selo Livre de Desmatamento, certificando
              a conservação florestal e o “no-greenwash”. Com QR Code, georreferenciamento e 
              inventário auditado, o selo comprova o desmatamento evitado e a origem sustentável do 
              ativo e é emitido após o processo de "burn", garantindo rastreabilidade e segurança jurídica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;
