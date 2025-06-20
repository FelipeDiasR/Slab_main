import React from 'react';


//importing parts of the page
//import { /*Article,*Fature,*/ Navbar } from '../../components';
import { Partners, Header, Preesale, Tokenomics, Brand, Cta, TransparencePortal /*NftInfo*/ } from '../../containers';
//import  from '../../containers/pages/home/transparence/Portal';//


const Home = () => {
  return (
    <div className='meow_home'>
      
      <Header />  
      <Brand />
      <Preesale />
      <Partners />
      <Tokenomics />
      <TransparencePortal />
     
      
      <Cta/>
      
      
     
    </div>


  )




}

export default Home;
