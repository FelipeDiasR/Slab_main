import React, { useContext } from 'react';
import './tokenomics.css';
import Chart from '../../../../img/assets/logos/Graphic_flow.svg';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';

const Tokenomics = () => {

  const { isLigmode } = useContext(ThemeContext);

  return (
    <div className={`meow__tokenomics ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__tokenomics_container'>
        <h1>Processo de Geração TBio</h1>
        <p>
          A SlaB.Assets realiza a geração de ativos de biodiversidade com máxima segurança e transparência.
          Todo o processo, desde o inventário de áreas até a certificação, é conduzido por especialistas e
          auditado por terceiros como a Bureau Veritas e B3, garantindo rastreabilidade e imutabilidade no
          blockchain. Os ativos, lastreados em CPR-Verde, valorizam 27 serviços ecossistêmicos, incluindo 
          captura de carbono, assegurando confiança jurídica e financeira. Confira no gráfico abaixo as empresas
          que contribuem para a emissão do TBio.
        </p>
        
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
