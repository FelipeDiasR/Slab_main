import { useState, useContext } from 'react';
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // Adicionando um ícone de fechar
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importando o hook de tradução
import './launchheader.css';

const LaunchHeader = () => {
    const { isLigmode } = useContext(ThemeContext);
    const { t } = useTranslation(); // Inicializando o hook de tradução
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
                                <h1 className='meowl_launchHeader_alert_title'>{t('launchHeader.alert.title')}</h1>
                            </div>
                            <p className='meowl_launchHeader_message'>{t('launchHeader.alert.message')}</p>
                        </div>
                    </div>
                )}
                <div className='meowl_launchHeader_title_container'>
                    <div className='meowl_launchHeader_title'>
                        <h1>{t('launchHeader.welcome.title')}</h1>
                    </div>
                </div>
                <div className='meowl-upcoming_titles'>
                    <h1>{t('launchHeader.upcoming.title')}</h1>
                    <p>{t('launchHeader.upcoming.description')}</p>
                </div>
            </div>
        </div>
    );
};

export default LaunchHeader;
