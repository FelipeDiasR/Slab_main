import './cards.css';
//import ProjectLogo from '../../../../img/logotipo.svg';
import { FaTelegram } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Cards =({ id, logo, status, name, website, twitter, telegram, open_sale, close_sale, token_price, total_raise }) => {
  return (
  <div className='meow__cards section__padding'>
      <div className='meow__cards_logo_button'>
          <img src={logo} alt='projectlogo'/> 
          <button>{status}</button> 
             
      </div>
      <div className='meow__cards_text'>
          <h1> {name}</h1>
          <div className='meow__cards_text_icons'>
            <a href={twitter} target="_blank" rel="noopener noreferrer"><FaSquareXTwitter/></a>
            <a href={telegram} target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
            <a href={website} target="_blank" rel="noopener noreferrer"><TfiWorld /></a>
          </div>
      </div>
      <div className='meow__cards_content'>
          <h2> Offerings</h2>
          <h3> Token Price</h3>
          <p> {token_price} </p>
          <h3> Round start on</h3>
          <p> {open_sale}</p>
          <h3> Round finish on</h3>
          <p> {close_sale}</p>
          <h3>Total Raise</h3>
          <p> {total_raise} </p>
      </div>
      <div className='meow__cards_seedetails'> 
      <Link to={`/details/${id}`}>
          <button>See Details</button>
        </Link>

      </div>
  
  </div>
  )

}

export default Cards