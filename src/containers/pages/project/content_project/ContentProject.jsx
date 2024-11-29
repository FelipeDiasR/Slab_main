import { useState, useEffect, useContext } from 'react';
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // Adicionando um ícone de fechar
//import { FaTelegram } from "react-icons/fa";
//import { TfiWorld } from "react-icons/tfi";
//import { FaSquareXTwitter } from "react-icons/fa6";
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { AiFillInstagram } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { SiGoogledocs } from "react-icons/si";
import './contentproject.css';

//import testelogo from '../../../../img/1meowlLogo.svg';

const ContentProject = ({ name, website, twitter, telegram,  
     project_logo, description, launchDate,
     clock, sub_title, tagProject1, tagProject2, 
     tagProject3,}) => {

    const { isLigmode } = useContext(ThemeContext);
    const [isAlertVisible, setIsAlertVisible] = useState(true); // Estado para controlar a visibilidade do alerta
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const handleAlertClose = () => {
        setIsAlertVisible(false);   
    };

    // Função para calcular o tempo restante até a data de lançamento
    const calculateTimeRemaining = () => {
        const now = new Date();
        const launch = new Date(launchDate); // Converter a data de lançamento para um objeto Date
        const diff = launch - now; // Diferença em milissegundos

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        } else {
            // Caso a data já tenha passado, zeramos o contador
            setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    useEffect(() => {
        if (clock) {
            const timer = setInterval(calculateTimeRemaining, 1000); // Atualiza a cada segundo
            return () => clearInterval(timer); // Limpa o intervalo quando o componente for desmontado
        }
        console.log('Clock value:', clock);

    }, [clock, launchDate]);

    return (
        <div className={`meowl_contentProject ${isLigmode ? 'lightmode' : ''}`}>
            <div className='meowl_contentProject_container'>
                <div className='meowl_contentProject_title'>
                    <h6> {sub_title} </h6>
                </div>
                <div className='meowl_contentProject_content'>
                    <div className='meowl_contentProject_logo'>
                      <img src={project_logo} alt="logo" />
                      
                    </div>
                    <div className='meowl_contentProject_maincontent'>
                        <div className='meowl_contentProject_firstcontent'>
                            <h1> {name} </h1>
                            {/* Exibe o contador apenas se 'clock' for true */}
                            {clock === true && (
                                <div className='meowl_contentProject_clock_container'>
                                    <h2> Lançamento em breve.. </h2>
                                    <div className='meowl_contentProject_clock_box'>
                                        <div className='meowl_contentProject_clock_content'>
                                            <p>{timeRemaining.days} Dias</p>
                                            <p>{timeRemaining.hours} Horas</p>
                                            <p>{timeRemaining.minutes} Minutos</p>
                                            <p>{timeRemaining.seconds} Segundos</p>
                                        </div>    
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="text-box-container_cont">
                            <div className="text-box_cont box1">
                                <h5> {tagProject1} </h5>
                            </div>
                            <div className="text-box_cont box2">
                                <h5> {tagProject2} </h5>
                            </div>
                            <div className="text-box_cont box3">
                                <h5> {tagProject3} </h5>
                            </div>
                            <div className='meowl_contentProject_paragraph'>
                                <p> 
                                    {description}
                                    
                                </p>
                                <div className='meowl_contentProject_media'>
                                    <a href={twitter} target="_blank" rel="noopener noreferrer"><SiGoogledocs /></a>
                                    <a href={telegram} target="_blank" rel="noopener noreferrer"><AiFillInstagram /></a>
                                    <a href={website} target="_blank" rel="noopener noreferrer"><TfiWorld /></a>
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
