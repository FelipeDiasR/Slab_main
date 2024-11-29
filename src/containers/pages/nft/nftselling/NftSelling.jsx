import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Reapercarrosel } from '../../../../img/index';
import './nftselling.css';
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';



const NftSelling = () => {
  const currentContent = {
    title: "Meowl Reaper",
    subtitle: "Mysterious reapers\nwith unique traits,\nready for action.",
    details: "Meowl Reaper lumberjack",
    weight: "Weight #19",
    image: Reapercarrosel,
  };

  const { isLigmode } = useContext(ThemeContext);

  return (
    <div className={`meow_nftselling ${isLigmode ? 'lightmode' : ''}`} id="home">
      <div className="meow_nftselling_container">
        <div className="meowl_nftselling_card">
          <div className="meowl_nftselling_card_container">
            <div className="meowl_nftselling_card_background">
              <img src={currentContent.image} alt="projectbackground" className="background-image_nft" />
            </div>
            <div className="meowl_nftselling_card_text">
              <h4>{currentContent.details}</h4>
              <h4>{currentContent.weight}</h4>
            </div>
          </div>
        </div>
        <div className="meow_nftselling_content">
          <h1>Join the MeowlGuardians<br/> NFT Airdrop!</h1>
          <p>
            Join the MeowlVerse community and <br/>claim your free MeowlGuardian NFT!<br/>
            Be among the first 2,000 members to<br/> receive an exclusive NFT at no cost.<br/>
            Claim yours now!
          </p>
          <div className="meow_nftselling_buttons">
            <div className="meow_nftselling_buttons_button1">
              <a 
                href="https://forms.gle/T2WnxwU9iDm8UM4n6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-link">
                <button>Claim Now!</button>
              </a>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NftSelling;
