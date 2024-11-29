import React, { useEffect, useState, useContext } from 'react';
import { LaunchHeader, CompletedProjects, UpcomingProjects, Banner } from '../../containers/index';
import { format } from 'date-fns';
import { ThemeContext } from '../../components/themecontext/ThemeContext';
import './launchpadLanding.css';

const LaunchpadLanding = () => {
  const { isLigmode } = useContext(ThemeContext);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const searchingRepositories = async () => {
      try {
        const response = await fetch('/projects/cardsProjects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRepositories(data.projects); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    searchingRepositories();
  }, []);

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

  // Filtrando os projetos com base na propriedade isCompleted
  const upcomingProjects = repositories.filter(repo => !repo.isCompleted);
  const completedProjects = repositories.filter(repo => repo.isCompleted);

  return (
    <div className={`meowl_launchpad${isLigmode ? ' lightmode' : ''}`}>
      <div className='meowl_launchpad_container'>
        <div className='meowl_launchpad_header'>
          <LaunchHeader />
        </div>
        {
          upcomingProjects.length > 0 ? (
            <div className='meowl_launchpad_upcoming_cards'>
              {console.log(upcomingProjects)}
              { 
                upcomingProjects.map((repo) => (
                  <UpcomingProjects 
                    key={repo.id}
                    name={repo.name} 
                    card_background={repo.card_background} 
                    website={repo.social_links.website}
                    twitter={repo.social_links.twitter} 
                    telegram={repo.social_links.telegram} 
                    project_logo={repo.project_logo}
                    status={repo.status} 
                    built_on_logo={repo.built_on_logo} 
                    round_start_on={repo.round_start_on}
                    token_price={repo.token_price} 
                    total_raise={repo.total_raise} 
                    tag1={repo.tag1} 
                    tag2={repo.tag2} 
                    tag3={repo.tag3} 
                    description={repo.description}
                    distribution={repo.distribution} 
                    vesting={repo.vesting} 
                    tge_date={repo.tge_date}
                    active={repo.active}
                    id={repo.id}
                    
                  />
                ))          
              }
            </div>
          ) : (
            <div className='conditinal_paragrath'>
            <p> Em breve, teremos projetos tokenizados disponíveis...</p>
            </div>
          )
        }
      </div>
      <div className='meowl-completed-content'>
        <div className='meowl-completed_titles'>
          <h1>Tokenizações Concluídas</h1>
          <p>Acompanhe todas as nossas tokenizações realizadas com sucesso.</p>
        </div>
        {
          completedProjects.length > 0 ? (
            <div className='meowl_launchpad_upcoming_cards'>
              {console.log(completedProjects)}
              { 
                completedProjects.map((repo) => (
                  <CompletedProjects 
                    key={repo.id}
                    name={repo.name} 
                    card_background={repo.card_background} 
                    website={repo.social_links.website}
                    twitter={repo.social_links.twitter} 
                    telegram={repo.social_links.telegram} 
                    project_logo={repo.project_logo}
                    status={repo.status}  
                    built_on_logo={repo.built_on_logo} 
                    round_start_on={repo.round_start_on}
                    token_price={repo.token_price} 
                    total_raise={repo.total_raise} 
                    tag1={repo.tag1} 
                    tag2={repo.tag2} 
                    tag3={repo.tag3} 
                    description={repo.description}
                    distribution={repo.distribution} 
                    vesting={repo.vesting} 
                    tge_date={repo.tge_date}
                    active={repo.active}
                    id={repo.id}
                  />
                ))          
              }
            </div>
          ) : (
            <div className='conditinal_paragrath'>
            <p> Em breve, teremos Tokenizações concluídas...</p>
            </div>
            
            
          )
        }
      </div>
      <Banner />
    </div>
  );
};

export default LaunchpadLanding;
