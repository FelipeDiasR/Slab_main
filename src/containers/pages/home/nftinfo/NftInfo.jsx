import React, { useState, useEffect } from 'react';
import '../../nft/nftheader/headernft.css';
import { Link } from 'react-router-dom';
import { Reapercarrosel, Shootercarrosel, MeowlKingCarrossel } from '../../../../img/index';

const NftInfo = () => {
  const contentList = [
    {
      title: "Meowl Reaper",
      subtitle: "Mysterious reapers\nwith unique traits,\nready for action.",
      details: "Meowl Reaper lumberjack",
      weight: "Weight #19",
      image: Reapercarrosel,
    },
    {
      title: "Meowl Shooter",
      subtitle: "Dynamic shooters with\n diverse styles and\n weaponry",
      details: "Meowl Shooter Sniper",
      weight: "Weight #11",
      image: Shootercarrosel,
    },
    {
      title: "Meowl King",
      subtitle: "Regal kings with\n majestic attributes and\n powerful presence.",
      details: "Meowl King",
      weight: "Weight #5",
      image: MeowlKingCarrossel,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
    }, 7000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [contentList.length]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const currentContent = contentList[currentIndex];

  return (
    <div className="meow__headernft" id="home">
      <div className="meow__headernft_container">
        <div className="meow__headernft_content">
          <h2>{currentContent.title}</h2>
          <h1 className="gradient_text">
            {currentContent.subtitle.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>
          <div className="meow__headernft_buttons">
            <div className="meow__headernft_buttons-button1">
             <Link to="/nft">
                <button>See Details</button>
              </Link>
            </div>
            <div className="meow__headernft_buttons-buttonairdrop">
              <a 
                href="https://forms.gle/T2WnxwU9iDm8UM4n6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-link"
              >
                <button>Claim Airdrop</button>
              </a>
            </div>
          </div>
        </div>
        <div className="meow__FirsrNFTcards">
          <div className="meow__FirsrNFTcards__container">
            <div className="meow__FirsrNFTcards__background">
              <img src={currentContent.image} alt="projectbackground" className="background-image_nft" />
            </div>
            <div className="meow__FirsrNFTcards__text">
              <h4>{currentContent.details}</h4>
              <h4>{currentContent.weight}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="meow__FirsrNFTcards__progress">
        {contentList.map((content, index) => (
          <div
            key={index}
            className={`progress-circle ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleClick(index)}
            style={{ backgroundImage: `url(${content.image})` }} // Adiciona a imagem ao círculo
          >
            <div
              className={`progress-bar ${index === currentIndex ? 'progress-active' : ''}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftInfo;
