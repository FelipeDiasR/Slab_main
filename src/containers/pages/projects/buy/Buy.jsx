import React, { useState, useEffect } from 'react';
import { useWallet } from '../../../../components/wallet/Walletcontext';
import './buy.css';
import abis from '../../../../abiteste'
import { ethers } from 'ethers';
import {ContractTest, usdcAbi}  from '../../../../Abi.js'

import { Loading, Approved, Denied } from '../../../../components';



const Buy = ({ name, status, open_buy, ticker, closed,
 raising_on, raising_in, smartcontractaddress, 
 smartcontractabi, total_supply, initial_supply, 
 marketcap, claimed_on, vesting, tge_avalilble, 
 token_price, tge_Availble, claim_Avalible}) => {
  const { account, connectWallet } = useWallet();
  const [contract, setContract] = useState(null)
  const [ abi, setABI] = useState(null);
  const [ userData, setUserData] = useState({
    totalInvested: null,
    totalPurchased: null,
    claimedAmount: null,
    tokensPerClaim: null,
    numberOfClaims: null,
    tgeAmount: null, 

  });
  //const [Loading, setLoading] = useState(false); 
  //const [loadingMessage, setLoadingMessage] = useState('');
  const [ stableAddress, setStableAddress] = useState(null);
  const [ abistable, setAbiStable] =  useState(null);
  const [amountToBuy, setAmountToBuy] = useState('');
  const [tokensReceived, setTokensReceived] = useState('');
  const [loading, setLoading] = useState(false);
  const [ approved, setApproved] = useState(false);
  const [ denied, setDenied ] = useState(false);
  const [ amountBlock, setAmountBlockchain] = useState(false);
  const [isTgeActivated, setIsTgeActivated] = useState(false);


  useEffect(() => {
    async function fetchDatas() {
      if (smartcontractabi !== false) {
        try {
          const smartcontract = smartcontractaddress;
          console.log('Este é o smartcontract:', smartcontract);
          setContract(smartcontract);
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
          setABI(abiItem.abi); // Supondo que cada item tenha um campo `abi`
        } else {
          console.error("ABI not found for the given address");
        }
      }
    };

    loadABI();
  }, [smartcontractaddress]); // Adicione dependência aqui

  const fetchUserData = async () => {
    if (abi && contract && account) {
      try {
        // Conecte ao provedor Ethereum (Metamask neste caso)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contractInstance = new ethers.Contract(smartcontractaddress, abi, provider);

        // Chamar a função `users` do contrato, passando o endereço da conta como parâmetro
        const userData = await contractInstance.users(account);
        console.log("User data:", userData);
        const formatAndRound = (value) => Math.round(parseFloat(value.toString()) / (10 ** 18));

        const formattedUserData = {
          totalInvested: (userData[0].toString()) / (10 ** 6),
          totalPurchased: formatAndRound(userData[1]),
          claimedAmount: formatAndRound(userData[2]),
          tokensPerClaim: formatAndRound(userData[4]),
          numberOfClaims: userData[3].toString(),
          tgeAmount: formatAndRound(userData[5])
        };
        console.log("Dados do usuário formatados:", formattedUserData);
        setUserData(formattedUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [abi, contract, account, smartcontractaddress]);


  useEffect(() => {
    const getstableaddressABI = async () => {
      if (abi && contract && account) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(smartcontractaddress, abi, provider);
          const stableaddress = await contract.stablecoin();
          console.log("stable Address:", stableaddress);
          setStableAddress(stableaddress);
          const abistable = abis.find((item) => item.address === stableaddress);
          console.log("abi da Stable  encontrada", abistable);
          setAbiStable(abistable);


        } catch (error) {
          console.error("error reading the stableBalance:", error);
        }
      }
  };
  getstableaddressABI();
}, );

useEffect(() => {
  async function testeData() {
    if (abistable && stableAddress) {
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contractInstance = new ethers.Contract(stableAddress, ContractTest, provider);
        const balance = await contractInstance.balanceOf(account);
        console.log("here the balance", balance)
      } catch (error) {
        console.error("error reading the stableBalance:", error);
      }
    }
};
testeData();
}, );


const handleAmountToBuyChange = (e) => {
  const inputAmount = e.target.value;
  
  // Verifica se o valor de entrada não está vazio
  if (!inputAmount) {
    setAmountToBuy('');
    setTokensReceived('');
    return;
  }

  const amountInWei = ethers.parseUnits(inputAmount, 6); // Converte para BigNumber
  setAmountToBuy(inputAmount);
  setAmountBlockchain(amountInWei); // Salva o valor como BigNumber

  // Lógica para calcular tokens recebidos com base na quantidade inserida
  const calculatedTokens = inputAmount / token_price; // Exemplo de cálculo
  setTokensReceived(calculatedTokens.toFixed(2));
};

// Função para manipular a alteração dos tokens recebidos
const handleTokensReceivedChange = (e) => {
  const inputAmount = e.target.value;
  if (!inputAmount) {
    setAmountToBuy('');
    setTokensReceived('');
    return;
  }

  const amountInWei = ethers.parseUnits(inputAmount, 6); // Converte para BigNumber
  setTokensReceived(e.target.value);

  // Lógica para calcular quantidade necessária para receber os tokens
  const calculatedAmount = parseFloat(e.target.value) * token_price; // Exemplo de cálculo
  setAmountToBuy(calculatedAmount.toFixed(2));
  setAmountBlockchain(amountInWei); // Salva o valor como BigNumber
};
const approveTokens = async () => {
  let provider, signer, currentAccount;

  try {
    if (!account) {
      await connectWallet();
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      currentAccount = await signer.getAddress();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      currentAccount = account;
    }

    const spender = contract;
    const amountToSpend = amountBlock; //amountToBuy amountBlock
    const contractInstance = new ethers.Contract(stableAddress, usdcAbi, signer);
    const tx = await contractInstance.approve(spender, amountToSpend);
    console.log('Transaction sent:', tx);

    setLoading(true);

    await tx.wait();

    console.log('Transaction confirmed:', tx);

    setLoading(false); // Ocultar o popup de carregamento

    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 3000);
    
    // Note: Aqui não chamamos a função buyTokens diretamente

  } catch (error) {
    console.error('Error approving tokens:', error);
    setLoading(false);
    setDenied(true);
    setTimeout(() => {
      setDenied(false);
    }, 3000);
  }
};

const buyTokens = async () => {
  if (!account || !amountBlock) {
    console.error("Account is not available or amountBlock is missing.");
    return;
  }

  let provider, signer, currentAccount;
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    currentAccount = await signer.getAddress();
    const contractInstance = new ethers.Contract(contract, abi, signer); 
    const buyTx = await contractInstance.buyTokens(amountBlock);
    console.log('Buy tokens transaction sent:', buyTx);

    setLoading(true);

    await buyTx.wait();

    console.log('Buy tokens transaction confirmed:', buyTx);

    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 3000);

  } catch (error) {
    setDenied(true);
    setTimeout(() => {
      setDenied(false);
    }, 3000);
    console.error("Error buying tokens:", error);
    
  } finally {
    setLoading(false);
    fetchUserData();
  }
};
  
const aprove = async () => {
  let provider, signer, currentAccount;

  try {
    if (!account) {
      await connectWallet();
      provider = new ethers.BrowserProvider(window.ethereum);
      console.log('testando o provider', provider);
      signer = await provider.getSigner();
      currentAccount = await signer.getAddress();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      currentAccount = account;
    }

    const spender = contract;
    const amountToSpend = amountBlock; //amountToBuy amountBlock
    const contractInstance = new ethers.Contract(stableAddress, usdcAbi, signer); // Utilize o signer aqui
    const tx = await contractInstance.approve(spender, amountToSpend);
    console.log('Transaction sent:', tx);

    setLoading(true);

    await tx.wait();

    console.log('Transaction confirmed:', tx);

    setLoading(false); // Ocultar o popup de carregamento

    setApproved(true);

      setTimeout(() => {
        setApproved(false);
      }, 3000);
      
    const contractWithSigner = new ethers.Contract(contract, abi, signer);
    const buyTx = await contractWithSigner.buyTokens(amountToSpend);
    console.log('Buy tokens transaction sent:', buyTx);

    setLoading(true);

    await buyTx.wait();

    console.log('Buy tokens transaction confirmed:', buyTx);

    setApproved(true);

      setTimeout(() => {
        setApproved(false);
      }, 3000);

    setLoading(false); // Ocultar o popup de carregamento

    // Atualizar os dados do usuário após a compra

    fetchUserData();
  

  } catch (error) {
    console.error('Error approving or buying tokens:', error);
    setLoading(false);
      setDenied(true);

      setTimeout(() => {
        setDenied(false);
      }, 3000);
    }
  };

  const claimTge = async () => {
    if (!isTgeActivated || !account) {
      console.error("TGE is not activated or account is not available.");
      return;
    }

    let provider, signer, currentAccount;
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      currentAccount = await signer.getAddress();
      const contractInstance = new ethers.Contract(smartcontractaddress, abi, signer); // Utilize o signer aqui 
      const tx = await contractInstance.claimTge();

      setLoading(true);
      await tx.wait();
      console.log('Transaction confirmed:', tx);

      setLoading(false);
      setApproved(true);

      setTimeout(() => {
        setApproved(false);
      }, 3000);
    } catch (error) {
      setDenied(true);
      
      setTimeout(() => {
        setDenied(false);
      }, 3000);
      console.error("Error claiming TGE:", error);
      
    } finally {
      setLoading(false);
      fetchUserData(); // Atualize os dados do usuário após a conclusão da operação
    }
  };

  const claimTokens = async () => {
    if (!isTgeActivated || !account) {
      console.error("TGE is not activated or account is not available.");
      return;
    }

    let provider, signer, currentAccount;
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      currentAccount = await signer.getAddress();
      const contractInstance = new ethers.Contract(smartcontractaddress, abi, signer); // Utilize o signer aqui 
      const tx = await contractInstance.claimTokens();

      setLoading(true);
      await tx.wait();
      console.log('Transaction confirmed:', tx);

      setLoading(false);
      setApproved(true);

      setTimeout(() => {
        setApproved(false);
      }, 1000);
    } catch (error) {
      setDenied(true);
      
      setTimeout(() => {
        setDenied(false);
      }, 1000);
      console.error("Error claiming TGE:", error);
      
    } finally {
      setLoading(false);
      fetchUserData(); // Atualize os dados do usuário após a conclusão da operação
    }
  };

  useEffect(() => {
    const fetchTgeActivationStatus = async () => {
      if (smartcontractaddress && abi && account) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contractInstance = new ethers.Contract(smartcontractaddress, abi, provider);
          const tgeActivation = await contractInstance.isTgeActivated();
          console.log("TGE Activation Status:", tgeActivation);
          setIsTgeActivated(tgeActivation);
        } catch (error) {
          console.error("Error reading the TGE Activation status:", error);
        }
      }
    };
  
    fetchTgeActivationStatus();
  }, [smartcontractaddress, abi, account]); // Adicione dependências aqui

  


  return (
    <div className={`meow__buy section__padding ${loading ? 'loading-active' : ''}`}>
      {loading && <Loading />} {/* Exibir o componente de loading */}

      {approved && <Approved />} {/* Exibir o componente Approved */}
      {denied && <Denied />} {/* Exibir o componente Denied */}
      
      <div className='meow__buy_pool'>
        <h1> Pool Details</h1>
        <h2> {status} </h2>
        <h3> Total Supply </h3>
        <p> {total_supply} </p>
        <h3> Initial Supply </h3>
        <p> {initial_supply} </p>
        <h3> Market Cap </h3>
        <p> {marketcap} </p>
      </div>

      <div className={`meow__buy_section ${!account || !open_buy ? 'opaque' : ''}`}>
        <div className='meow__buy_text'>
          <h1> Buy </h1>
          <p> To be able to buy it you must have {raising_in} <br /> on {raising_on} </p>
        </div>
        <div className='meow__buy_inputs'>
        <input className='meow_buy_input1' type='text' value={amountToBuy} onChange={handleAmountToBuyChange} placeholder={raising_in}/>
        <input className='meow_buy_input2' type='text' value={tokensReceived} onChange={handleTokensReceivedChange} placeholder={ticker} />
        <div className='meow__buy_buttons'>
          <button className='desktop-only' disabled={!account || !open_buy} onClick={aprove}> Buy </button>
          <button className='mobile-only' disabled={!account || !amountBlock} onClick={approveTokens}> Approve </button>
          <button className='mobile-only buy-tokens-button' disabled={!account || !amountBlock} onClick={buyTokens}> Buy Tokens </button>
        </div>
        </div>
      </div>

      <div className='meow__buy_distribution_seedetails'>
        <h1> Distribution </h1>
        <h3> Distribution </h3>
        <p> Claimed on {claimed_on} </p>
        <h3> Vesting </h3>
        <p> {vesting} </p>
      </div>

      <div className={`meow__buy_claim_section ${!account || !tge_Availble ? 'opaque' : ''}`}>
        <h1> Claim Section </h1>
        <h3> Total Purchased </h3>
        <p> {userData.totalPurchased} {ticker} </p>
        <h3> Claim TGE </h3>
        <p> {userData.tgeAmount || '0'} {ticker} </p>
        <button onClick={claimTge} disabled={!isTgeActivated || loading}>
        Claim TGE
      </button>
        <h3> Claim Tokens </h3>
        <p> Number of claims: {userData.numberOfClaims || '0'} </p>
        <p> Claim value: {userData.tokensPerClaim || '0'} MWOL </p>
        <p> {tge_avalilble}</p>
        <button onClick={claimTokens} disabled={!account || !claim_Avalible}> Claim Tokens </button>
      </div>
    </div>   
  );
};

export default Buy;
