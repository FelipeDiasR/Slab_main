import { useState, useContext, React, useEffect} from 'react';
import { FaCopy } from 'react-icons/fa';
import { LuAlertCircle } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io"; // Adicionando um ícone de fechar
import { ThemeContext } from '../../../../components/themecontext/ThemeContext';
//import {logoBlackProject, logoBlackProject2, logoWhiteProject, logoWhiteProject2 } from '../../../../img/index';
import logo_icon from '../../../../img/assets/logos/logo_icon.svg';
import { InfoPopup } from '../../../../components';
// Importar seu arquivo JSON com os dados
import popupData from '../../../../data/text_info.json';
import { useWallet } from '../../../../components/wallet/Walletcontext';
import { ethers } from 'ethers';
import abis from '../../../../abis/mainAbi';
import {usdcAbi} from '../../../../abis/UsdcAbi';
import './navegationproject.css';
import { Loading, Approved, Denied, Forms } from '../../../../components';
import {GeneralPopup} from '../../../../components/index'; 


const NavegationProject = ({ earlier_open_time, earlier_Supply_offerd, ticker,
    earlier_size, open_open_time, open_Supply_offerd, open_size, completed_descrption,
    Launchprice, currenprice, ath, number_realeses, clif, claim_interval, vesting,
    smartcontractaddress, smartcontractabi, buy_with, tge_date, fundraise_goal, token_price,
    buil_on, built_on2, stableAddress, bannerproject, total_raise, tge_Availble, token_address,
    claim_Avalible, open_buy, open_subscription, closed, rpc, explorerUrl,
    chain_name, token_name, symbol, decimals, network, claim_section, distribution}) => {
    
    const { account, connectWallet } = useWallet();
    const [contract, setContract] = useState(null)
    const { isLigmode } = useContext(ThemeContext);
    const [fetchCount, setFetchCount] = useState(0);
    const [rightNetwork, setRightNetwork] = useState(null);
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);
    const [ abi, setABI] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ approved, setApproved] = useState(false);
    const [ denied, setDenied ] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(true); // Estado para controlar a visibilidade do alerta
    const [activeIndex, setActiveIndex] = useState(0);
    const [amountToBuy, setAmountToBuy] = useState('');
    const [tokensReceived, setTokensReceived] = useState('');
    const [amountBlockchain, setAmountBlockchain] = useState(null);
    const [popupInfo, setPopupInfo] = useState({ show: false, title: '', content: '' });
    const [userData, setUserData] = useState({
        totalInvested: null,
        totalPurchased: null,
        tokenBalance: null,
        tokenBurned: null, 
        totalwithdrawn: null,
        /*claimedAmount: null,
        tokensPerClaim: null,
        numberOfClaims: null,
        tgeAmount: null,
        numberClaimed: null,
        totalNumberOfClaims: null,
        tgeClaimed: null,*/
      });
    const [isTgeActivated, setIsTgeActivated] = useState(false);
    const [popup, setPopup] = useState({
        visible: false,
        message: '',
        success: true
      });
     // Função para abrir o popup com as informações corretas
    const handleOpenPopup = (title, content) => {
        setPopupInfo({ show: true, title, content });
    };
    
    const [progressPercentage, setProgressPercentage] = useState(0);

    // Função para fechar o popup
    const handleClosePopup = () => {
        setPopupInfo({ show: false, title: '', content: '' });
    };
    
    const [isBuyClaimActive, setIsBuyClaimActive] = useState(false);
    const [fundraising, setFundraising] = useState({
      totalToRaise: null,
      alreadyCaptured: null
    });
    
    const alreadyCapturedForm = (parseFloat((fundraising.alreadyCaptured / (10 ** 18)).toString()) || 0)
   .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const toneladasGol = (parseFloat((fundraising.totalToRaise / (10 ** 18)).toString()) || 0)
    .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleSectionClick = (index) => {
        console.log(index);
        setActiveIndex(index);
        if (index === 4) {
            setIsBuyClaimActive(true);
          } else {
            setIsBuyClaimActive(false);
          }
        };


        useEffect(() => {
            async function fetchDatas() {
              if (smartcontractabi !== false) {
                try {
                  const smartcontract = smartcontractaddress;
                 
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
                
          
                // Função auxiliar para formatar valores grandes
                const formatAndRound = (value) => Math.round(parseFloat(value.toString()) / (10 ** 18));
          
                // Verifique se o objeto possui todas as propriedades esperadas
                const formattedUserData = {
                  totalInvested: (userData[0] ? (parseFloat(userData[0].toString()) / (10 ** 6)) : 0),
                  totalPurchased: (userData[1] ? (parseFloat(userData[1].toString()) / (10 ** 18)) : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                  tokenBalance: (userData[2] ? (parseFloat(userData[2].toString()) / (10 ** 18)) : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                  tokenBurned: (userData[3] ? (parseFloat(userData[3].toString()) / (10 ** 18)) : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                  totalwithdrawn: (userData[4] ?(parseFloat(userData[4].toString()) / (10 ** 18)) : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                  /*claimedAmount: (userData[2] ? formatAndRound(userData[2]) : 0),
                  numberOfClaims: (userData[3] ? parseInt(userData[3].toString()) : 0),
                  tokensPerClaim: (userData[4] ? formatAndRound(userData[4]) : 0),
                  tgeAmount: (userData[5] ? formatAndRound(userData[5]) : 0),
                  numberClaimed: (userData[6] ? parseInt(userData[6].toString()) : 0),
                  totalNumberOfClaims: (userData[7] ? parseInt(userData[7].toString()) : 0),
                  tgeClaimed: (userData[8] !== undefined ? Boolean(userData[8]) : false), // Tratamento booleano*/
                };
          
               
                setUserData(formattedUserData);
              } catch (error) {
                console.error('Error fetching user data1:', error);
              }
            }
          };
          useEffect(() => {
            const manageNetwork = async () => {
              try {
                if (network) {
                  setRightNetwork(network);
                  
                }
        
                // Verifica se a carteira está conectada, open_buy é verdadeiro, e network está definido
                if (account && open_buy && network) {
                  // Verifica se o objeto Ethereum está disponível na janela
                  if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const { chainId } = await provider.getNetwork();
        
                    
        
                    // Compara a rede do usuário com a rede correta do projeto
                    if (Number(chainId) !== Number(parseInt(network, 16))) {
                      setIsCorrectNetwork(false);
                      console.log('Usuário não está na rede correta');
                    } else {
                      setIsCorrectNetwork(true);
                      console.log('Usuário está na rede correta');
                    }
                  } else {
                    console.error('Objeto Ethereum não encontrado, instale o Metamask.');
                  }
                } else {
                  console.log('Conexão com carteira não está ativa ou open_buy é falso.');
                }
              } catch (error) {
                console.error('Erro ao verificar ou definir a rede:', error);
              }
            };
        
            // Chama a função para gerenciar a rede
            manageNetwork();
        
          }, [account, open_buy, network]);  // Certifique-se de que estas dependências estão configuradas corretamente
        
          // Adicione mais verificações para garantir que o estado inicial é correto e não é sobrescrito por engano.
             
         
          const switchNetwork = async () => {
            if (typeof window.ethereum !== 'undefined' && rightNetwork) {
              try {
                // Tentando mudar para a rede correta
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: rightNetwork }],
                });
                setIsCorrectNetwork(true);
                
              } catch (switchError) {
                // Se a rede não estiver disponível, tenta adicionar a rede
                if (switchError.code === 4902) {
                  try {
                    await window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [{
                        chainId: rightNetwork,
                        rpcUrls: [rpc],
                        chainName: chain_name,
                        nativeCurrency: {
                          name: token_name,
                          symbol: symbol,
                          decimals: 18,
                        },
                        blockExplorerUrls: [explorerUrl],
                      }],
                    });
                    setIsCorrectNetwork(true);
                    
                    console.log('Rede adicionada e trocada com sucesso!');
                    fetchUserData();
                    
                  } catch (addError) {
                    console.error('Erro ao adicionar a rede:', addError);
                  }
                } else {
                  console.error('Erro ao trocar de rede:', switchError);
                }
              }
            } else {
              console.error('Ethereum não detectado ou rede correta não definida.');
            }
          };

          useEffect(() => {
            if (isCorrectNetwork && fetchCount < 10) {
              // Chama fetchUserData e incrementa o contador se o limite ainda não foi atingido
              fetchUserData();
              setFetchCount(prevCount => prevCount + 1);
            }
          }, [isCorrectNetwork, fetchCount, fetchUserData]); 
        
          
          const handleAmountToBuyChange = (e) => {
            const inputAmount = e.target.value.trim();
        
            // Se o valor de entrada for vazio ou não numérico, reseta os valores
            if (!inputAmount || isNaN(inputAmount)) {
                setAmountToBuy('');
                setTokensReceived('');
                setAmountBlockchain(null);
                return;
            }
        
            // Converte o valor de entrada para um número
            const amountNumber = parseFloat(inputAmount);
        
            // Verifica novamente se amountNumber é válido após a conversão
            if (isNaN(amountNumber)) {
                setAmountToBuy('');
                setTokensReceived('');
                setAmountBlockchain(null);
                return;
            }
        
            // Calcular o valor dos tokens recebidos
            const calculatedTokens = amountNumber / token_price;
        
            // Atualiza os estados com os valores calculados
            setAmountToBuy(inputAmount); // Mantém a entrada original como string
            setTokensReceived(calculatedTokens.toFixed(2)); // Define tokens recebidos com duas casas decimais
        
            // Atualiza o valor em Wei se for um valor válido
            const amountInWei = ethers.parseUnits(amountNumber.toString(), 6);
            setAmountBlockchain(amountInWei);
        };
        
        // Função para manipular a alteração dos tokens recebidos
        const handleTokensReceivedChange = (e) => {
            const inputTokens = e.target.value.trim();
        
            // Se o valor de entrada for vazio ou não numérico, reseta os valores
            if (!inputTokens || isNaN(inputTokens)) {
                setAmountToBuy('');
                setTokensReceived('');
                setAmountBlockchain(null);
                return;
            }
        
            // Converte o valor de entrada para um número
            const tokensNumber = parseFloat(inputTokens);
        
            // Verifica novamente se tokensNumber é válido após a conversão
            if (isNaN(tokensNumber)) {
                setAmountToBuy('');
                setTokensReceived('');
                setAmountBlockchain(null);
                return;
            }
        
            // Calcular o valor necessário para comprar os tokens
            const calculatedAmount = tokensNumber * token_price;
        
            // Atualiza os estados com os valores calculados
            setTokensReceived(inputTokens); // Mantém a entrada original como string
            setAmountToBuy(calculatedAmount.toFixed(2)); // Define amount to buy com duas casas decimais
        
            // Atualiza o valor em Wei se for um valor válido
            const amountInWei = ethers.parseUnits(calculatedAmount.toString(), 6);
            setAmountBlockchain(amountInWei);
        };
          
          
          useEffect(() => {
            fetchUserData();
          }, [abi, contract, account, smartcontractaddress]);



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
              const amountToSpend = amountBlockchain; //amountToBuy amountBlock
              const contractInstance = new ethers.Contract(stableAddress, usdcAbi, signer);// Utilize o signer aqui
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
              fetchFundraisingData();
            
          
            } catch (error) {
              console.error('Error approving or buying tokens:', error);
              setLoading(false);
                setDenied(true);
          
                setTimeout(() => {
                  setDenied(false);
                }, 3000);
              }
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
              const amountToSpend = amountBlockchain; //amountToBuy amountBlock
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
            if (!account || !amountBlockchain) {
              console.error("Account is not available or amountBlock is missing.");
              return;
            }
          
            let provider, signer, currentAccount;
            try {
              provider = new ethers.BrowserProvider(window.ethereum);
              signer = await provider.getSigner();
              currentAccount = await signer.getAddress();
              const contractInstance = new ethers.Contract(contract, abi, signer); 
              const buyTx = await contractInstance.buyTokens(amountBlockchain);
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

          //-------------- claim tokens
           //--------------
            //--------------
             //--------------
              //--------------
               //--------------
                //--------------
                
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

          useEffect(() => {
            console.log("Account1:", account);
            console.log("Is Correct Network teste:", isCorrectNetwork);
        }, [account, isCorrectNetwork]);
        
        const fetchFundraisingData = async () => {
          if (!smartcontractaddress || !abi || !account) {
            console.error('Contract address, ABI, or account is missing');
            return;
          }
        
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contractInstance = new ethers.Contract(smartcontractaddress, abi, provider);
            
            // Chamar a função `fundraising` do contrato
            const [totalToRaise, alreadyCaptured] = await contractInstance.fundraising();
        
            // Atualizar o estado com os dados formatados
            setFundraising({
              totalToRaise: totalToRaise.toString(),
              alreadyCaptured: alreadyCaptured.toString(),
            });
            
            console.log('Fundraising data fetched:', { totalToRaise, alreadyCaptured });
          } catch (error) {
            console.error('Error fetching fundraising data:', error);
            setFundraising({
              totalToRaise: null,
              alreadyCaptured: null,
            });
          }
        };

        useEffect(() => {
          fetchFundraisingData();
        }, [abi, smartcontractaddress, account]); // Dependências para reexecutar a função quando necessário


     
        const calculateProgressPercentage = () => {
          // Manter os valores como BigInt para maior precisão
          const captured = fundraising.alreadyCaptured || 0n; // 0n é um BigInt zero
          const total = fundraising.totalToRaise || 0n;  // 0n é um BigInt zero
          
          console.log('Valores convertidos:', { captured, total });
        
          if (captured > 0n && total > 0n) {
            // Cálculo da porcentagem mantendo a precisão com BigInt
            const percentage = (Number(captured) / Number(total)) * 100;
            setProgressPercentage(percentage);
            console.log('Porcentagem calculada:', percentage);
          } else {
            console.log('O valor é zero ou inválido');
            setProgressPercentage(0);
          }
        };

        useEffect(() => {
          calculateProgressPercentage();
        }, [ total_raise]); // Dependências para atualizar a porcentagem quando necessário
    


    const contentList = [
        {
            section: "Token Sale",
            content: (
                <>
                <div className='meowl_navegation_pools_container'>
                            <div className='meowl_navegation_earlier'>
                                <div className='meowl_navegation_earlier_content'>
                                    <div className='meowl_vanegation_earlier_title'>
                                        <img src={isLigmode ? logo_icon : logo_icon} alt='logotipo' /> 
                                        <h2>Distribuição</h2>
                                        <IoMdInformationCircleOutline className='meowl_navegation_pools_icon'
                                         onClick={() => handleOpenPopup(popupData.meowlEarlier.title, popupData.meowlEarlier.content)} />
                                        
                                    </div>
                                    <h3>Lançamento</h3>
                                    <p>{earlier_open_time}</p>
                                    <h3>Quantidade de Tokens</h3>
                                    <p>{earlier_Supply_offerd} {ticker}</p>
                                    
                                </div>
                            </div>
                            <div className='meowl_navegation_earlier'>
                                <div className='meowl_navegation_earlier_content'>
                                    <div className='meowl_vanegation_earlier_title'>
                                        <img src={isLigmode ? logo_icon : logo_icon} alt='logotipo' /> 
                                        <h2>CPR-Verde</h2>
                                        <IoMdInformationCircleOutline className='meowl_navegation_pools_icon'
                                         onClick={() => handleOpenPopup(popupData.openMeowl.title, popupData.openMeowl.content)} />
                                    </div>
                                    <h3>Data de emissão</h3> 
                                    <p>{open_open_time}</p>
                                    <h3>Ticker</h3>
                                    <p>{ticker}</p>
                                    
                                </div>
                            </div>  
                    </div>
             </>
            ),
          },
        {
          section: "Description",
          content: (
            <>
                <div className='meowl_navegation_description'>
                    <h3> Sobre {ticker} </h3>
                    <p>
                        {completed_descrption.split('<br/><br/>').map((line, index) => (
                           <>
                           {line}
                           <br /><br />
                         </>
                        ))}
                    </p>
                </div>
            </>

          ),
        },
        {
          section: "Token Info",
          content: (
            <>
                <div className='meowl_navegation_tokenInfo_container'>
                            <div className='meowl_navegation_price'>
                                <div className='meowl_navegation_earlier_content'>
                                    <h3>Preço do token</h3>
                                    <p> {Launchprice}</p>
                                </div>
                            </div>
                            <div className='meowl_navegation_price'>
                                <div className='meowl_navegation_earlier_content'>
                                    <h3>Preço de mercado</h3>
                                    <p>{currenprice}</p>
                                </div>
                            </div>
                            <div className='meowl_navegation_price'>
                                <div className='meowl_navegation_earlier_content'>
                                    <h3>Alta histórica</h3>
                                    <p>{ath}</p>
                                </div>
                            </div>
    
                    </div>
             </>
          ),
        },
        {
          section: "Vesting",
          content: (
            <>
              <div className='meowl_navegation_token_info'>
                        <div className='meowl_navegation_token_info_container'>
                            <div className='meowl_navegation_token_info_title'>
                                
                                <div className='meowl_navegation_title_container'>
                        
                                    <div className='meowl_navegation_token_info_h2'>
                                        <h2>Recebimento</h2>
                                        <IoMdInformationCircleOutline className='meowl_navegation_pools_icon' 
                                     onClick={() => handleOpenPopup(popupData.Claimsection.title, popupData.Claimsection.content)}/>
                                    </div>            
                                    <div className='meowl_navegation_token_info_data1'>
                                        <h3>Plataforma de recebimento</h3>
                                        <p>{distribution}</p>
                                    </div>  
                                </div>
                                    
                            </div>

                            
                        </div>       
                    </div>
            </>
          ),
        }
        ,
        {
            section: "Buy / Claim",
            content: open_buy ? (
              <>
                <div className='meowl_navegation_pools_container'>
                  <div className='meowl_navegation_BuyMint'>
                    <div className='meowl_navegation_earlier_content'>
                      <div className='meowl_buy_title1'>
                        <h2>Comprar</h2>         
                      </div>
                      <p>Para realizar compras, você deve ter {buy_with} na rede Polygon. 1 Token representa 1 tCO2eq.
                      </p>
                      <div className='meowl_buy_title_input'>
                        
                        <input
                          className='meow_buy_input2'
                          type='text'
                          value={tokensReceived}
                          onChange={handleTokensReceivedChange}
                          placeholder={ticker} 
                        />
                        <input
                          className='meow_buy_input1'
                          type='text'
                          value={amountToBuy}
                          onChange={handleAmountToBuyChange}  
                          placeholder={buy_with}
                        />
                        <div className='meow__buy_title_buttons'>
                          <div className='meow__buy_desktop_buttons'>
                            <button className='desktop-only' onClick={aprove}> 
                            Comprar
                            </button>
                          </div>
                          <div className='meow__buy_mobile_buttons'>
                          <button className='mobile-only' disabled={!account || !amountBlockchain} onClick={approveTokens}> Aprovar </button>
                          {/*<button className='mobile-only2' disabled={!account || !amountBlockchain} onClick={buyTokens}> Comprar </button>*/}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
          
                  <div className='meowl_navegation_BuyMint'>
                    <div className='meowl_navegation_token_info_title'>
                      <div className='meowl_navegation_user_container'>
                        <div className='meowl_navegation_token_info_h2'>
                          <h2>Minhas informações</h2>
                        </div>   
                        <div className='meowl_navegation_token_info_data2'>
                          <h3>Total investido em Dólar</h3>
                          <p>{userData.totalInvested ?? 0}</p>
                        </div>          
                        <div className='meowl_navegation_token_info_data1'>
                          <h3> Total de toneladas compradas</h3>
                          <p>{userData.totalPurchased ?? 0}</p>
                        </div>         
                        <div className='meowl_navegation_token_info_data2'>
                          <h3>Saldo em tokens</h3>
                          <p>{userData.tokenBalance ?? 0}</p>
                        </div> 
                        <div className='meowl_navegation_token_info_data2'>
                          <h3>Total queimado</h3>
                          <p>{userData.tokenBurned ?? 0}</p> 
                        </div> 
                        <div className='meowl_navegation_token_info_data2'>
                          <h3>Saque realizado</h3>
                          <p>{userData.totalwithdrawn ?? 0}</p> 
                        </div> 

                        <p>Obs: Após a compra, seus tokens estarão disponíveis na plataforma Slab. Para 
                        sacá-los ou exercer seus direitos sobre os ativos de biodiversidade lastreados em 
                        CPR-Verde, preencha o formulário abaixo.</p>
                        
                      </div>
                    </div>
                  </div>  
                </div>
              </>
            ) : (
                <div className='meowl_buy_claim_box'>
                        <p>Quando a CPR estiver aberta, você poderá comprar aqui.</p>            
                </div>
            ),
          }
          
        
      ];

   

    return (
        <div className={`meowl_navegation ${isLigmode ? 'lightmode' : ''}` }>
            {popup.visible && <GeneralPopup message={popup.message} success={popup.success} onClose={closePopup} />}
           <div className='meowl_navegation_container'>
            {loading && <Loading />} {/* Exibir o componente de loading */}
            {approved && <Approved />} {/* Exibir o componente Approved */}
            {denied && <Denied />} {/* Exibir o componente Denied */}
                <div className='meowl_navegation_content'>
                    <div className='meowl_navegation_contentFirst'>
                        <img className='banner_project' src={bannerproject} alt="logo" />
                        <div className='meowl_navegation_paragraph'>
                            <p 
                                className={activeIndex === 0 ? 'actived' : ''}
                                onClick={() => handleSectionClick(0)}
                            >
                                Venda do token
                            </p>
                            <p 
                                className={activeIndex === 1 ? 'actived' : ''}
                                onClick={() => handleSectionClick(1)}
                            >
                                Descriçao
                            </p>
                            <p 
                                className={activeIndex === 2 ? 'actived' : ''}
                                onClick={() => handleSectionClick(2)}
                            >
                                Token Info
                            </p>
                            <p 
                                className={activeIndex === 3 ? 'actived' : ''}
                                onClick={() => handleSectionClick(3)}
                            >
                                Recebimento
                            </p>
                            <p 
                                className={activeIndex === 4 ? 'actived' : ''}
                                onClick={() => handleSectionClick(4)}      
                            >
                                Comprar
                            </p>
                            
                        </div>

                        <div> 
                        {!account ? (          
                        <div className='meowl_navegation_box'>
                            <div className='meowl_navegation_box_content'>
                                <LuAlertCircle className='meowl_meowl_navegation_box_icon' />
                                
                                <p>
                                    Conecte sua carteira para ver os detalhes to token
                                </p>
                                
                               
                                <>
                                  
                                </>
                                
                            </div>
                            
                        </div>
                        ) : account && !isCorrectNetwork ? (
                        <div>
                            <div className='meowl_navegation_box'>
                                <div className='meowl_navegation_box_content'>
                                    <LuAlertCircle className='meowl_meowl_navegation_box_icon' />
                                        <p>
                                          Mude a rede usando o botão abaixo, para ser possível ver as informações to doken.
                                        </p>
                                      
                                </div>
                            
                            </div>
                            <button onClick={switchNetwork} className='switch-network-button'>
                                        Mude a rede
                                        </button>       
                        </div>
                         ) : null}
                        </div>
                       
                      
                        <div className='meowl_navegation_pools_container'>
                            {contentList[activeIndex].content}
                        </div>
                    </div>
                    
                    <div className='meowl_navegation_contentSecond'>
                        <div className='meowl_navegation_card_container'>
                            <div className='meowl_navegation_card_title'>
                                <h2>Detalhes da oferta</h2>
                                <div className='meowl_navegation_funding_container'>
                                    <div className='meowl_navegation_funding_content'>
                                        <h3>Toneladas em oferta</h3>
                                        <p>{fundraise_goal}</p>
                                    </div>
                                    <div className='meowl_navegation_funding_logo'>
                                        <img src={built_on2} alt='logo' />
                                    </div>
                                </div>
                                <div className='meowl_teste1'>
                                    <div className='meowl_navegation_funding_numbers'>
                                    <p>{alreadyCapturedForm}</p>
                                        <p>{toneladasGol}</p>
                                    </div>
                                    
                                      <div className='meowl_navegation_funding_loading'>
                                      <div 
                                        className='progress-bar'
                                        style={{ width: `${progressPercentage}%` }}
                                        // Corrigido para usar crase e notação de interpolação correta
                                      />
                                      </div> 
                                    
                                    <div className='meowl_navegation_title_info'>
                                        <h2>Info</h2>
                                    </div>            
                                    <div className='meowl_navegation_funding_division'>   </div>
                                    <div className='meowl_navegation_funding_division2'>   </div>
                                    <div className='meowl_navegation_funding_data1'>
                                        <h3>Preço do token</h3>
                                        <p>{token_price}</p>
                                    </div>  
                                    <div className='meowl_navegation_funding_division'>   </div>
                                    <div className='meowl_navegation_funding_division'>   </div>
                                    
                                
                                    <div className='meowl_navegation_funding_data2'>
                                        <h3> Blockchain </h3>
                                        <p>{buil_on}</p>
                                    </div> 
                                    <div className='meowl_navegation_funding_division'>   </div>
                                    <div className='meowl_navegation_funding_division'>   </div>  
                                    <div className='meowl_navegation_funding_data3'>
                                        <h3> Moeda para compra </h3>
                                        <p> USDC</p>
                                    </div>  
                                
                                </div>
                                    
                            </div>

                            
                        </div>       
                    </div>
                    
                </div>
                {isBuyClaimActive && claim_section && (
                    <div className='meowl_navegation_contentThird_buy'>
                    <div className='meowl_navegation_Third_card'>
                        <div className='meowl_navegation_card_title'>
                        <div className='meowl_naegation_third_first_div'>
                            <h2>Painel de Transaprência</h2>
                            <IoMdInformationCircleOutline
                            className='meowl_navegation_pools_icon'
                            onClick={() =>
                                handleOpenPopup(popupData.Claimsection.title, popupData.Claimsection.content)
                            }
                            />
                            
                        </div>
                            
                        <div className='meowl_teste23'>
                        <Forms />
                        </div>
                        </div>
                    </div>
                    </div>
                )}
           </div>
           <InfoPopup show={popupInfo.show} onClose={handleClosePopup} title={popupInfo.title} content={popupInfo.content} />
        </div>
    );
};

export default NavegationProject;
