import React from 'react';
import './nftbenefits.css';
import { IoGameControllerOutline, IoKeyOutline } from "react-icons/io5";
import { RiUserVoiceLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { GiCardJoker } from "react-icons/gi";
const NftBenefits = () => {
  const contentBenefits = [
    {
      title: "Exclusive Access",
      icon: IoKeyOutline,
      text: "Get early access to new\n features, updates, and events\n within MeowlVerse."
    },
    {
      title: "Game Integration",
      icon: IoGameControllerOutline,
      text: "Special skins and abilities in\n MeowlVerse games, based on\n the weight of your NFTs."
    },
    {
      title: "Governance",
      icon: RiUserVoiceLine,
      text: "Participate in important\n decisions within the\n MeowlVerse ecosystem."
    },
    {
      title: "Special Events",
      icon: FaRegCalendarAlt,
      text: "Invitations to exclusive\n events, both virtual and in-\nperson."
    },
    {
      title: "MeowlPad Integration",
      icon: BsRocketTakeoff,
      text: "Access exclusive\n opportunities on the\n MeowlPad launchpad"
    },
    {
      title: "Bet for free",
      icon: GiCardJoker,
      text: "Get special advantages in\n MeowlVerse bet games."
    }
  ];

  return (
    <div className="meow__nft_benefits">
      {contentBenefits.map((benefit, index) => (
        <div key={index} className="meow__nft_benefits__container">
          <div className="meow__nft_benefits_textInside">
            <div className="meow__nft_benefits_title">
              <benefit.icon className="benefit-icon" />
              <h1>{benefit.title}</h1>
            </div>
            <p>{benefit.text.split('\n').map((line, index) => (
              <React.Fragment key={index}>{line}<br /></React.Fragment>
            ))}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftBenefits;
