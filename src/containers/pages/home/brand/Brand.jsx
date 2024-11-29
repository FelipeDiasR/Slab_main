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
            <Link to="/launchpad"><h2>Ativos de Biodiversidade</h2></Link>
            <Link to="/launchpad"> 
              <p>
                Conheça o TBio (Token de Biodiversidade), nosso token de biodiversidade lastreado em CPRV
                e registrado no ambiente B3 <br/>(Brasil Bolsa Balcão). Representando o valor da conservação
                florestal, o TBio evita riscos de greenwashing, assegurando que as
                áreas já prestaram serviços ecossistêmicos como o armazenamento de gases do efeito estufa e o equilíbrio ecológico. Certificado e regulamentado, o TBio
                promove a preservação ambiental enquanto gera valor financeiro.
              </p>
            </Link>
          </div>
        </div>
        <div className='meow__brand_content_gaming'>
          <div className='meow__brand_gaming'>
            <Link to="/game"><h2>Tokenização e Blockchain</h2></Link>
            <Link to="/game"> 
              <p>
                Utilizamos tecnologia de ponta para tokenizar ativos de biodiversidade, 
                garantindo negociação segura e rastreável no blockchain. Essa inovação permite 
                criar unidades digitais fracionadas, facilitando sua comercialização global com 
                total transparência, segurança e rastreamento do impacto positivo de cada investimento.
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
