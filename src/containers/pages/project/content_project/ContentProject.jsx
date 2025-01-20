import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillInstagram } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { SiGoogledocs } from "react-icons/si";
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import './contentproject.css';

const ContentProject = ({
  name,
  website,
  twitter,
  telegram,
  project_logo,
  launchDate,
  clock,
  sub_title,
  tagProject1,
  tagProject2,
  tagProject3,
  cardId // ← Passado como prop
}) => {
  const { isLigmode } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Montamos a chave de tradução dinamicamente, caso cardId esteja definido
  const descriptionKey = cardId
    ? `projects.card${cardId}.description`
    : null;

  // Se cardId for undefined, description será uma string vazia
  const description = descriptionKey ? t(descriptionKey) : "";

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Função para calcular o tempo restante
  const calculateTimeRemaining = () => {
    const now = new Date();
    const launch = new Date(launchDate);
    const diff = launch - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    } else {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    if (clock) {
      const timer = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(timer);
    }
  }, [clock, launchDate]);

  return (
    <div className={`meowl_contentProject ${isLigmode ? "lightmode" : ""}`}>
      <div className="meowl_contentProject_container">
        <div className="meowl_contentProject_title">
          <h6>{sub_title}</h6>
        </div>
        <div className="meowl_contentProject_content">
          <div className="meowl_contentProject_logo">
            <img src={project_logo} alt="logo" />
          </div>
          <div className="meowl_contentProject_maincontent">
            <div className="meowl_contentProject_firstcontent">
              <h1>{name}</h1>
              {clock && (
                <div className="meowl_contentProject_clock_container">
                  <h2>{t("contentProject.launchSoon")}</h2>
                  <div className="meowl_contentProject_clock_box">
                    <div className="meowl_contentProject_clock_content">
                      <p>
                        {timeRemaining.days} {t("contentProject.timeUnits.days")}
                      </p>
                      <p>
                        {timeRemaining.hours} {t("contentProject.timeUnits.hours")}
                      </p>
                      <p>
                        {timeRemaining.minutes} {t("contentProject.timeUnits.minutes")}
                      </p>
                      <p>
                        {timeRemaining.seconds} {t("contentProject.timeUnits.seconds")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-box-container_cont">
              <div className="text-box_cont box1">
                <h5>{tagProject1}</h5>
              </div>
              <div className="text-box_cont box2">
                <h5>{tagProject2}</h5>
              </div>
              <div className="text-box_cont box3">
                <h5>{tagProject3}</h5>
              </div>
              <div className="meowl_contentProject_paragraph">
                <p>{description}</p>
                <div className="meowl_contentProject_media">
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <SiGoogledocs />
                  </a>
                  <a href={telegram} target="_blank" rel="noopener noreferrer">
                    <AiFillInstagram />
                  </a>
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    <TfiWorld />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentProject;
