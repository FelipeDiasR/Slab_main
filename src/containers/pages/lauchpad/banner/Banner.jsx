import React, {useContext} from 'react';
import ProjectLogo from '../../../../img/assets/logos/slab_greenlogo.svg';

//css
import './banner.css';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';

const Banner = () => {

  const { isLigmode } = useContext(ThemeContext);
  return (
    
    <div className={`meow__banner  ${isLigmode ? 'lightmode' : ''}`}>
      <div className='meow__banner_content'>
        <div className='meow__banner_text'>
          <h1>Você lidera um projeto inovador e está pronto para transformar ativos reais e sustentáveis em tokens?</h1>
          <p>Entre em contato com a Slab Assets hoje mesmo para explorar oportunidades de tokenização e lançamento de ativos. Conecte-se à nossa comunidade, uma das mais engajadas e influentes no espaço de tokenização. Junte-se a nós e vamos moldar o futuro dos ativos tokenizados juntos!</p>
        </div> 
        <div className='meow__banner_logo'>
          <img src={ProjectLogo} alt='projectlogo' />
        </div>
      </div>
      <div className="meow__banner__button">
        <a href="https://forms.gle/niLDyFN1MhRRySmn9" target="_blank" rel="noopener noreferrer" className="meow__banner__link">
          Entre em contato
        </a>
      </div>
    </div>
  )
}

export default Banner;
