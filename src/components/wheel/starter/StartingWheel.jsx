import React, { useState } from 'react';
import starter from '../../../img/gamecards/Starter.svg';
import './starterwheel.css';
import Pin from '../../../img/gamecards/pinWheel.svg';

// Ângulos dos segmentos na roda (em graus)
const segmentAngles = {
  1: 365,
  2: 335,
  3: 305,
  4: 275,
  5: 245,
  6: 215,
  7: 185,
  8: 155,
  9: 125,
  10: 95,
  11: 65,
  12: 45,
};

// Prêmios correspondentes aos segmentos
const prizes = {
  1: "$1",
  2: "$5",
  3: "Try Again",
  4: "$Meowl 1M",
  5: "$3",
  6: "Try again2",
  7: "$15",
  8: "$0.50",
  9: "$Meowl 500k",
  10: "Try again3",
  11: "$10",
  12: "Free Spin",
};

function StartingWheel() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleSpin = () => {
    setIsSpinning(true);
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    const targetAngle = segmentAngles[randomNumber];

    // Normaliza o ângulo atual para estar entre 0 e 359 graus
    const normalizedRotation = rotation % 360;

    // Calcula o ângulo adicional necessário para parar no segmento correto
    const additionalRotation = (targetAngle - normalizedRotation + 360) % 360;

    // Calcula a rotação total adicionando múltiplas voltas completas
    const totalRotation = rotation + (360 * 3) + additionalRotation;

    setRotation(totalRotation);
    setTimeout(() => {
      setIsSpinning(false);
      setResult(prizes[randomNumber]);
    }, 5000); // Tempo de rotação em milissegundos
  };

  return (
    <div className="meow__starter_wheel_landing">
      <div className="meowl__starter_wheel_container">
        <div className="meowl__starter_wheel_wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          <img src={starter} alt='wheel' className="meowl__starter_wheel_wheel"/>
        </div>
        <div className='meowl__starter_wheel_pin'>
          <img src={Pin} alt='pin' className="pin-wheel"/>
        </div>
        <div className="meowl__starter_buttons">
          {!isConnected && (
            <button className="meowl__starter_wallet" onClick={handleConnect}>
              Connect Wallet to play
            </button>
          )}

          {isConnected && (
            <>
              <div className="meowl__starter_bet_minbet">
                <button className="meowl__starter_bet">
                  Bet
                </button>
                <h4 className="meowl__starter_minbet">Min. Bet: $5 USDC</h4>
              </div>
              <div className="meowl_starter_Spin">
                <button 
                  className="meowl__starter_spinwheel" 
                  onClick={handleSpin} 
                  disabled={isSpinning}
                >
                  {isSpinning ? 'Spinning...' : 'Click to spin'}
                </button>
              </div>
              {result && <h4>Result: {result}</h4>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartingWheel;
