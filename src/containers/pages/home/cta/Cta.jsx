"use client";
import { useState } from 'react';
import { db } from '../../../../components/firebase/firebase'; // Certifique-se de que o caminho está correto
import { collection, addDoc } from 'firebase/firestore';
import './cta.css'

import banner from '../../../../img/assets/cta/banner_cta.svg';

export default function Forms() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Enviando os dados para o Firestore
      await addDoc(collection(db, 'formResponses'), formData);
      setSuccessMessage('Formulário enviado com sucesso!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='forms'>
      <div className='forms_container'>
        {/* Fundo dividido em duas cores */}
        <div className='back'>
          <div className='topHalf'></div>
          <div className='bottomHalf'></div>
        </div>

        {/* Imagem sobreposta */}
        <div className='imageWrapper'>
          <img
            src={banner}
            alt="Placeholder"
            className='forms_banner_image'
            width={100}
            height={100}
          />

          {/* Texto sobreposto dentro da imagem */}
          <div className='imageTextOverlay'>
            <h2>Central de Suporte</h2>
            <div className='desktopText'>
              <p>
                Estamos aqui para ajudar! Nossa<br />
                equipe de suporte ao cliente é<br />
                altamente capacitada e está pronta<br />
                para atender às suas necessidades.
              </p>
            </div>
            <div className='mobileText'>
              <p>Entre em contato clicando no botão abaixo.</p>
            </div>
            <button
              className='cta_button'
              onClick={() =>
                window.open(
                  'mailto:suporte@4cashpay.com.br?subject=Suporte&body=Olá, preciso de ajuda com...'
                )
              }
            >
              suporte@slab.com.br
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Fundo e Formulário */}
      <div className='forms_container_background'>
        <div className='forms_container_content'>
          <h1>Vem Conhecer!</h1>
          <div className='forms_division'></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome Completo (obrigatório)</label>
            <input
              type="text"
              id="name"
              placeholder="Seu Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">E-mail (obrigatório)</label>
            <input
              type="email"
              id="email"
              placeholder="Seu E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Telefone/WhatsApp</label>
            <input
              type="tel"
              id="phone"
              placeholder="(XX) XXXXX-XXXX"
              value={formData.phone}
              onChange={handleChange}
            />

            <label htmlFor="message">
              Conte um pouco sobre a sua empresa e como a Slab pode te ajudar:
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Sua mensagem"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className='submit_button' disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            {successMessage && <p className='success_message'>{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
