import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar o hook de tradução
import './upcomingprojects.css';
import { AiFillInstagram } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { SiGoogledocs } from "react-icons/si";
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { Link } from 'react-router-dom';

const UpcomingProjects = ({
  name,
  card_background,
  website,
  twitter,
  telegram,
  status,
  built_on_logo,
  token_price,
  project_logo,
  round_start_on,
  total_raise,
  tag1,
  tag2,
  tag3,
  description,
  distribution,
  vesting,
  tge_date,
  active,
  id,
}) => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation(); // Hook de tradução
  const [activeIndex, setActiveIndex] = useState(0);

  const contentList = [
    {
      section: t('upcomingProjects.offerings'),
      content: (
        <>
          <h3>{t('upcomingProjects.tokenPrice')}</h3>
          <p>${token_price}</p>
          <h3>{t('upcomingProjects.isinCode')}</h3>
          <p>{vesting}</p>
          <h3>{t('upcomingProjects.tonsAvailable')}</h3>
          <p>{total_raise}</p>
        </>
      ),
    },
    {
      section: t('upcomingProjects.description'),
      content: (
        <div>
          <div className="text-box-container">
            <div className="text-box box1">
              <h5>{tag1}</h5>
            </div>
            <div className="text-box box2">
              <h5>{tag2}</h5>
            </div>
            <div className="text-box box3">
              <h5>{tag3}</h5>
            </div>
          </div>
          <h4 className="text-box-p">{t(`projects.card${id}.description`)}</h4> {/* Tradução dinâmica baseada no ID */}
        </div>
      ),
    },
    {
      section: t('upcomingProjects.otherInfo'),
      content: (
        <>
          <h3>{t('upcomingProjects.distribution')}</h3>
          <p>{active ? t('upcomingProjects.active') : t('upcomingProjects.closed')}</p>
          <h3>{t('upcomingProjects.isinCode')}</h3>
          <p>{vesting}</p>
          <h3>{t('upcomingProjects.launchDate')}</h3>
          <p>{t(`projects.card${id}.tgeDate`)}</p> {/* Tradução dinâmica para a data de lançamento */}
        </>
      ),
    },
  ];

  const handleSectionClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={`meowl_upcoming ${isLigmode ? 'lightmode' : ''}`}>
      <div className="meowl_upcoming_container">
        <div className="meowl_upcoming_container_card">
          <div className="meowl_upcoming_background">
            <img src={card_background} alt="project background" className="upcoming_background" />
            <button className="meowl_upcoming_status">
            {t(`projects.card${id}.status`)}{/* Tradução dinâmica */}
            </button>
          </div>
          <div className="meowl_upcoming_logo">
            <img src={project_logo} alt="project logo" />
          </div>
          <div className="meowl_upcoming_content_first">
            <div className="meowl_upcoming_content_title_midia">
              <h1>{name}</h1>
              <div className="meowl_upcoming_content_media">
                <a href={twitter} target="_blank" rel="noopener noreferrer"><SiGoogledocs /></a>
                <a href={telegram} target="_blank" rel="noopener noreferrer"><AiFillInstagram /></a>
                <a href={website} target="_blank" rel="noopener noreferrer"><TfiWorld /></a>
              </div>
            </div>
            <div className="meowl_upcoming_content_built_container">
              <div className="meowl_upcoming_content_built">
                <p>{t('upcomingProjects.blockchain')}</p>
                <img src={built_on_logo} alt="blockchain logo" />
              </div>
            </div>
          </div>
          <div className="meowl_upcoming_content_second">
            <div className="meowl_upcoming_content_navbar">
              {contentList.map((item, index) => (
                <h3
                  key={index}
                  className={activeIndex === index ? 'active' : ''}
                  onClick={() => handleSectionClick(index)}
                >
                  {item.section}
                </h3>
              ))}
            </div>
            <div className="meowl_upcoming_content_data">
              {contentList[activeIndex].content}
            </div>
            <div className="meowl_upcoming_content_button">
              <Link to={`/project/${id}`}>
                <button>{t('upcomingProjects.buy')}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjects;
