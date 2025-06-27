import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './portal.css';

const TransparencePortal = () => {
  const { t } = useTranslation();
  const [burnedTokens, setBurnedTokens] = useState([]);

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

  const shortenHash = (hash, charsStart = 6, charsEnd = 4) => {
    if (!hash || hash.length <= charsStart + charsEnd) return hash;
    return `${hash.slice(0, charsStart)}...${hash.slice(-charsEnd)}`;
  };

  
  if (burnedTokens.length === 0) {
    return null; 
  }

  return (
    <div className="portal-transparencia-container">
      <h1 className="portal-transparencia-title">
        {t('transparency.title')}
      </h1>

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
              <td>{shortenHash(item.tokenAddress)}</td>
              <td><strong>{item.burnDate}</strong></td>
              <td>
                <a
                  className="clickable-hash"
                  href={`https://polygonscan.com/tx/${item.transactionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenHash(item.transactionId)}
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
