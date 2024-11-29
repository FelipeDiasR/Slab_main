
import React from 'react';


//importing parts of the page
//import { /*Article,*Fature,*/ Navbar } from '../../components';
import { Partners, Header, Preesale, Tokenomics, Brand, Cta /*NftInfo*/ } from '../../containers';


const Home = () => {
  return (
    <div className='meow_home'>
      
      <Header />  
      <Brand />
      <Preesale />
      <Partners />
      <Tokenomics />
     
      
      <Cta/>
      
      
     
    </div>


  )




}

export default Home;
