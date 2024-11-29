
import React, { useEffect, useState } from 'react';

import './lauchpad.css';
//importing parts of the page
//import { /*Article,*Fature,*/ Navbar } from '../../components';
import { Alert, Cards, Banner, /*Tokenomics, Brand, Cta*/ } from '../../containers';
  
import { format } from 'date-fns';


const Launchpad = () => {
  const [repositories , setRepositories] = useState([]);

  useEffect ( ( ) =>  {
    const searchingRepositories = async () => {
      try {
        const response = await fetch('/cards.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data);
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


  return (
      <div className='meow__lauchpad'>
        <div className= "meow__lauchpad_container">
          <Alert /> 
          <h1 className='meow__lauchpad_global'> Welcome to MeowlPad</h1>
          {
            repositories.length > 0 ? (
              <div className='meow__lauchpad_cards'>
                  {console.log(repositories)}
                  { 
                    repositories.map((repo) => (
                      <Cards logo={repo.image} status={repo.status} name={repo.name}
                      website={repo.social_links.website} twitter={repo.social_links.twitter}
                      telegram={repo.social_links.telegram} open_sale={formatDate(repo.sales_opening_date)}
                      close_sale={formatDate(repo.sales_closing_date)} token_price={repo.token_price}
                      total_raise={formatCurrency(repo.total_to_raise)} id={repo.id}/>
                    ) )          
                  }
                </div>

            ) : (
              <p> Soon we are going to have projects...</p>
            )
          }
          </div>
        <Banner/>
      </div>

  )




}

export default Launchpad;
