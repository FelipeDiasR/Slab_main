import React, {useContext} from 'react';
import './nftoffers.css'; // Arquivo CSS para estilização
//import background from '../../../../img/assets/nfts/testeNft.svg';
import logoWhithouLeters from '../../../../img/assets/logoWhithouLeters.svg';
//import profileImage from '../../../../img/assets/nfts/profileImage.svg'; // Adicione o caminho correto da nova imagem de perfil
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';



const NftOffers = ({ name, weight, description, backgroubdImage }) => {

  const { isLigmode } = useContext(ThemeContext);

  return (
    <div className={`meow__Nft_cards ${isLigmode ? 'lightmode' : ''}`}>
      <div className="meow__Nft_cards__container">
        <div className="meowl__nft_cards_textInside">
          <div className="profile-image-container">
            <img src={logoWhithouLeters} alt='profile' className="profile-image" /> 
          </div>
          <h3>@MeowlVerse</h3>
        </div>
        <div className="meow__Nft_cards__background">
          <img src={backgroubdImage} alt='projectbackground_Nft' className="background1-image" /> 
        </div>
        <div className="meow__Nft_cards__text_description">
          <h1>{name}</h1>
          <h2>{weight}</h2>
        </div>
      </div>
    </div>
  );
};

export default NftOffers;
