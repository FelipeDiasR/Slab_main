import React, { useState, useEffect, useContext } from 'react';
import './nftlanding.css';
import { NftOffers, HeaderNFT, Nftbenefits, NftSelling } from '../../containers';
import { ThemeContext } from '../../components/themecontext/ThemeContext';



const NftLanding = () => {
  const [NftArts, SetNft] = useState([]);
  const [moreNftsLoaded, setMoreNftsLoaded] = useState(false);
  const [showOpenSeaButton, setShowOpenSeaButton] = useState(false);
  const { isLigmode } = useContext(ThemeContext);

  useEffect(() => {
    const SearchNFTS = async () => {
      try {
        const response = await fetch('/cardsNft.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data fetched', data);
        SetNft(data.nfts);
      } catch (error) {
        console.error('error fetching data', error);
      }
    };
    SearchNFTS();
  }, []);

  const loadMoreNFTs = async () => {
    try {
      const response = await fetch('/cardsNftMore.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('more data fetched', data);
      SetNft(prevNfts => [...prevNfts, ...data.nfts]);
      setMoreNftsLoaded(true);
      setShowOpenSeaButton(true); // Mostrar o botão "See Collection on OpenSea"
    } catch (error) {
      console.error('error fetching more data', error);
    }
  };

  return (
    <div className={`meow_nftLanding${isLigmode ? 'lightmode' : ''}`}>
      <HeaderNFT />
      <div className="meowl__nft_intro_text">
        <h1>Explore the collection</h1>
        <h3>MeowlVerse Guardians</h3>
      </div>

      {NftArts.length > 0 ? (
        <div className="meow_nfts_cards">
          {console.log(NftArts)}
          {NftArts.map((repo) => (
            <NftOffers
              key={repo.name}
              name={repo.name}
              weight={repo.weight}
              description={repo.description}
              backgroubdImage={repo.backgroubdImage}
            />
          ))}
        </div>
      ) : (
        <p>Soon we are going to have NFTs</p>
      )}

      {!moreNftsLoaded && (
        <div className="load-more-button-container">
          <button onClick={loadMoreNFTs} className="load-more-button">
            Load More NFTs
          </button>
        </div>
      )}

      {showOpenSeaButton && (
        <div className="opensea-button-container">
          <button onClick={() => window.open('https://opensea.io/collection/meowlguardians', '_blank')} className="opensea-button">
            See Collection on OpenSea
          </button>
        </div>
      )}
      <div className='meow_beneffits_container'>
        <div className='meow__beneffits_text'>
          <h1> Exclusive Benefits of MeowlGuardians </h1>
          <p> By owning a MeowlGuardian NFT, you not only acquire a unique digital art 
            piece but also<br/> unlock a series of exclusive benefits within the MeowlVerse
            ecosystem. Discover how<br/> being a guardian can enhance your experience.</p>
          
        </div>
        < Nftbenefits />
        <div className="seeall-button-container">
          <button onClick={() => window.open('https://meowl-1.gitbook.io/meowlverse-whitepaper/meowlguardians-nft-collection', '_blank')} className="opensea-button">
            See all benefits
          </button>
        </div>
      </div>
      < NftSelling />
    </div>
  );
};

export default NftLanding;
