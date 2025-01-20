import React, { useEffect, useState, useContext } from 'react';
import { HeaderProject, ContentProject, BannerProject, NavegationProject, Banner } from '../../containers/index';
import { format } from 'date-fns';
import { ThemeContext } from '../../components/themecontext/ThemeContext';
import './project.css';
import { useParams } from 'react-router-dom';


const Project = () => {
  const { isLigmode } = useContext(ThemeContext);
  const [repositories , setRepositories] = useState([]);

  const { id } = useParams(); // Pega o ID da URL
  console.log('ID from URL:', id);
  const [project, setProject] = useState(null);
  
  
  useEffect(() => {
    const searchingRepositories = async () => {
        try {
            const response = await fetch('/projects/cardsProjects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data fetched:', data);

            // Converte o ID da URL para número antes de comparar
            const selectedProject = data.projects.find(project => project.id === Number(id));
            console.log('Selected Project:', selectedProject);
            setProject(selectedProject); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    searchingRepositories();
  }, [id]);




  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
 
    return (
      <div className={`meowl_project_main${isLigmode ? 'lightmode' : ''}`}>
        <div className='meowl_launchpad_container'>
          <div className='meowl_launchpad_header'>
            < HeaderProject />
          </div>
          {
                project ? (
                <ContentProject
                    name={project.name}
                    description={project.description}
                    project_logo={project.project_logo}
                    id={project.id}
                    clock={project.clock}
                    sub_title={project.sub_title}
                    tagProject1={project.tagProject1}
                    tagProject2={project.tagProject2}
                    tagProject3={project.tagProject3}
                    launchDate={project.launchDate}
                    twitter={project.social_links.twitter}
                    website={project.social_links.website}
                    telegram={project.social_links.telegram}
                    cardId={project.id}
                />) : (
                
                
                null)
                }
        
         </div>
         {
            project ? (
        
            <NavegationProject
              earlier_open_time={project.earlier_open_time}
              earlier_Supply_offerd={project.earlier_Supply_offerd}
              earlier_size={project.earlier_size} open_open_time={project.open_open_time}
              open_Supply_offerd={project.open_Supply_offerd} open_size={project.open_size}
              completed_descrption={project.completed_descrption}
              Launchprice={project.Launchprice}
              currenprice={project.currenprice}
              ath={project.ath} number_realeses={project.number_realeses}
              clif={project.clif} claim_interval={project.claim_interval}
              tagProject3={project.tagProject3} 
              buy_with={project.buy_with}
              fundraise_goal={project.fundraise_goal}
              token_price={project.token_price}
              buil_on={project.buil_on}
              ticker={project.ticker}
              vesting={project.vesting}
              tge_date={project.tge_date}
              built_on2={project.built_on2}
              smartcontractaddress={project.smartcontractaddress}
              smartcontractabi={project.smartcontractabi}
              stableAddress={project.stableAddress}
              bannerproject={project.bannerproject}
              tge_Availble={project.tge_Availble}
              token_address={project.token_address}
              claim_Avalible={project.claim_Avalible}
              open_buy={project.open_buy}
              open_subscription={project.open_subscription}
              closed={project.closed}
              rpc={project.rpc}
              explorerUrl={project.explorerUrl}
              chain_name={project.chain_name}
              token_name={project.token_name}
              symbol={project.symbol}
              decimals={project.decimals}
              network={project.network}
              claim_section={project.claim_section}
              total_raise={project.total_raise}
              distribution={project.distribution} 
              cardId={project.id}
            /> ) : (
            <div className='conditinal_paragrath'>
            <p> Carregando...</p>
            </div>
                
            )

         }
        < Banner />
        
      </div>
    );
  };
  
  export default Project;
