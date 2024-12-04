import { useState, useContext } from 'react';
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // Adicionando um ícone de fechar
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import './launchheader.css';

const LaunchHeader = () => {
    const { isLigmode } = useContext(ThemeContext);
    const [isAlertVisible, setIsAlertVisible] = useState(true); // Estado para controlar a visibilidade do alerta

    const handleAlertClose = () => {
        setIsAlertVisible(false);  
    };

    return (
        <div className={`meowl_launchHeader ${isLigmode ? 'lightmode' : ''}`}>
            <div className='meowl_launchHeader_container'>
                {isAlertVisible && (  // Renderiza o alerta apenas se isAlertVisible for true
                    <div className='meowl_launchHeader_alert_container'>
                        <div className='meowl_launchHeader_alert'>
                            <div className='meowl_launchHeader_close'>
                                <MdClose className='meowl_launchHeader_icon_close' onClick={handleAlertClose} />
                            </div>
                            <div className='meowl_launchHeader_i'>
                                <LuAlertCircle className='meowl_launchHeader_alert_icon' />
                                <h1 className='meowl_launchHeader_alert_title'>Sempre Tenha certeza que a URL é Slab.com</h1>
                            </div>
                            <p className='meowl_launchHeader_message'>Tenha cuidado com links maliciosos</p>
                        </div>
                    </div>
                )}
                <div className='meowl_launchHeader_title_container'>
                    <div className='meowl_launchHeader_title'>
                        <h1> Seja Bem vindo a Slab </h1>
                    </div>
                </div>
                <div className='meowl-upcoming_titles'>
                    <h1> Próximas Tokenizações </h1>
                    <p> Descubra as áreas Brasileiras onde estão sendo criados os ativos de biodiversidade.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LaunchHeader;
