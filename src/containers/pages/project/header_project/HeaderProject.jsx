import { useState, useContext } from 'react';
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // Adicionando um ícone de fechar
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
import './headerproject.css';

const HeaderProject = () => {
    const { isLigmode } = useContext(ThemeContext);
    const [isAlertVisible, setIsAlertVisible] = useState(true); // Estado para controlar a visibilidade do alerta

    const handleAlertClose = () => {
        setIsAlertVisible(false);  
    };

    return (
        <div className={`meowl_HeaderProject ${isLigmode ? 'lightmode' : ''}`}>
            <div className='meowl_HeaderProject_container'>
                {isAlertVisible && (  // Renderiza o alerta apenas se isAlertVisible for true
                    <div className='meowl_HeaderProject_alert_container'>
                        <div className='meowl_HeaderProject_alert'>
                            <div className='meowl_HeaderProject_close'>
                                <MdClose className='meowl_HeaderProject_icon_close' onClick={handleAlertClose} />
                            </div>
                            <div className='meowl_HeaderProject_i'>
                                <LuAlertCircle className='meowl_HeaderProject_alert_icon' />
                                <h1 className='meowl_HeaderProject_alert_title'>Sempre Tenha certeza que a URL é Slab.com.br</h1>
                            </div>
                            <p className='meowl_HeaderProject_message'>Tenha cuidado com links maliciosos</p>
                        </div>
                    </div>
                )}
                <div className='meowl_HeaderProject_title_container'>
                    <div className='meowl_HeaderProject_title'>
                        <h1> Seja Bem vindo a Slab </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderProject;
