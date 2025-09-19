import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './portal.css';

const TransparencePortal = () => {
  const { t } = useTranslation();
  const [burnedTokens, setBurnedTokens] = useState([]);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 510);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 320);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/burnedTokens.json');
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data = await response.json();
        setBurnedTokens(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 510);
      setIsSmallMobile(window.innerWidth <= 320);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shortenHash = (hash, charsStart = 6, charsEnd = 4) => {
    if (!hash || hash.length <= charsStart + charsEnd) return hash;
    return `${hash.slice(0, charsStart)}...${hash.slice(-charsEnd)}`;
  };

  const getResponsiveHashLength = () => {
    if (isSmallMobile) {
      return { start: 3, end: 2 };
    }
    if (isMobile) {
      return { start: 4, end: 3 };
    }
    return { start: 6, end: 4 };
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Endereço copiado!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Erro ao copiar: ', err);
      setCopyFeedback('Erro ao copiar');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  
  if (burnedTokens.length === 0) {
    return null; 
  }

  return (
    <div className="portal-transparencia-container">
      <h1 className="portal-transparencia-title">
        {t('transparency.title')}
      </h1>
      
      {copyFeedback && (
        <div className="copy-feedback">
          {copyFeedback}
        </div>
      )}

      <table className="portal-transparencia-table">
        <thead>
          <tr>
            <th>{t('transparency.amountBurned')}</th>
            <th>{t('transparency.tokenAddress')}</th>
            <th>{t('transparency.burnDate')}</th>
            <th>{t('transparency.transactionHash')}</th>
          </tr>
        </thead>
        <tbody>
          {burnedTokens.map((item, index) => (
            <tr key={index}>
              <td>{item.amount}</td>
              <td>
                <span
                  className="clickable-address"
                  onClick={() => copyToClipboard(item.tokenAddress)}
                  title="Clique para copiar o endereço completo"
                >
                  {shortenHash(item.tokenAddress, getResponsiveHashLength().start, getResponsiveHashLength().end)}
                </span>
              </td>
              <td><strong>{item.burnDate}</strong></td>
              <td>
                <a
                  className="clickable-hash"
                  href={`https://polygonscan.com/tx/${item.transactionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenHash(item.transactionId, getResponsiveHashLength().start, getResponsiveHashLength().end)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransparencePortal;
