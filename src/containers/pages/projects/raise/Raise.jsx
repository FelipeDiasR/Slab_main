// src/components/Raise.jsx
import React, { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import './raise.css';
import { ethers } from 'ethers';
import abis from '../../../../abiteste';
import {GeneralPopup} from '../../../../components/index'; // Importe o novo componente Popup// Certifique-se de importar o componente correto

const Raise = ({ description, ticker, raising_on, raising_in, token_address, smartcontractaddress, smartcontractabi }) => {
  const [account, setAccount] = useState(null);
  const [fundraising, setFundraising] = useState({
    totalToRaise: null,
    alreadyCaptured: null
  });

  const goal = parseFloat(fundraising.totalToRaise / (10 ** 6) || '1');
  const alreadyCaptured = parseFloat(fundraising.alreadyCaptured / (10 ** 6) || '0');
  const progressPercentage = (alreadyCaptured / goal) * 100;

  const [fundingcontract, setContract] = useState(null);
  const [fundingAbi, setFundingAbi] = useState(null);

  const [popup, setPopup] = useState({
    visible: false,
    message: '',
    success: true
  });

  useEffect(() => {
    async function fetchDatas() {
      if (smartcontractabi !== false) {
        try {
          const smartcontract = smartcontractaddress;
          setContract(smartcontract);
          console.log("SmartContract", smartcontract)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    fetchDatas();
  }, [smartcontractaddress, smartcontractabi]);

  useEffect(() => {
    const loadABI = () => {
      if (smartcontractaddress) {
        const abiItem = abis.find((item) => item.address === smartcontractaddress);
        if (abiItem) {
          console.log("abi encontrada", abiItem)
          setFundingAbi(abiItem.abi);
        } else {
          console.error("ABI not found for the given address");
        }
      }
    };
    loadABI();
  }, [smartcontractaddress]);

  useEffect(() => {
    async function checkWalletConnection() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    }
    checkWalletConnection();
  }, []);

  useEffect(() => {
    const getFundraising = async () => {
      if (!window.ethereum && fundingcontract) {
        console.error('Ethereum provider is not available');
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(fundingcontract, fundingAbi, provider);
        const [totalToRaise, alreadyCaptured] = await contract.fundraising();
        setFundraising({
          totalToRaise: totalToRaise.toString(),
          alreadyCaptured: alreadyCaptured.toString(),
        });
        console.log('Fundraising data fetched:', { totalToRaise, alreadyCaptured });
      } catch (error) {
        console.error('Error reading fundraising:', error);
        setFundraising({
          totalToRaise: null,
          alreadyCaptured: null,
        });
      }
    };
    getFundraising();
  }, [fundingcontract, fundingAbi]);

  useEffect(() => {
    console.log('Fundraising Data:', fundraising);
    console.log('Goal:', goal);
  }, [fundraising, goal]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token_address).then(() => {
      setPopup({ visible: true, message: 'Address copied', success: true });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      setPopup({ visible: true, message: 'Failed to copy address', success: false });
    });
  };

  const closePopup = () => {
    setPopup({ visible: false, message: '', success: true });
  };

  return (
    <div className='meow__raise section__padding'>
      {popup.visible && <GeneralPopup message={popup.message} success={popup.success} onClose={closePopup} />}
      <div className='meow__raise_logo_button'>
        <h1>Description</h1>
        <p>{description}</p>
      </div>
      <div className='meow__raise_text'>
        <h1>Raise details</h1>
      </div>
      <div className='meow__raise_content'>
        <h2>Token Ticker - {ticker}</h2>
        <h3>Token address</h3>
        <p>{token_address} <FaCopy onClick={copyToClipboard} style={{ cursor: 'pointer' }} /></p>
        <h3>Raising on</h3>
        <p>{raising_on}</p>
        <h3>Raising in</h3>
        <p>{raising_in}</p>
        <h3>Current progress</h3>
        <p>{progressPercentage.toFixed(2)} %</p>
        <div className='meow__raise_progress'>
          <div className='meow__raise_progress_bar' style={{ width: `${progressPercentage} %` }}>
            <span>{progressPercentage > 0 ? `${progressPercentage.toFixed(2)}%` : '0%'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Raise;
