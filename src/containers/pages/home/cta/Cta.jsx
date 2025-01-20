"use client";
import { useState } from 'react';
import { db } from '../../../../components/firebase/firebase'; // Certifique-se de que o caminho está correto
import { collection, addDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next'; // Importação do hook de tradução
import './cta.css';

import banner from '../../../../img/assets/cta/banner_cta.svg';

export default function Forms() {
  const { t } = useTranslation(); // Hook para tradução

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
      await addDoc(collection(db, 'formResponses'), formData);
      setSuccessMessage(t('supportCenter.successMessage', 'Form successfully submitted!'));
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forms">
      <div className="forms_container">
        <div className="back">
          <div className="topHalf"></div>
          <div className="bottomHalf"></div>
        </div>

        <div className="imageWrapper">
          <img
            src={banner}
            alt={t('supportCenter.title')}
            className="forms_banner_image"
            width={100}
            height={100}
          />
          <div className="imageTextOverlay">
            <h2>{t('supportCenter.title')}</h2>
            <div className="desktopText">
            <p
                dangerouslySetInnerHTML={{
                  __html: t('supportCenter.description'),
                }}
              ></p>
            </div>
            <button
              className="cta_button"
              onClick={() =>
                window.open(
                  'mailto:suporte@slab.com.br?subject=Suporte&body=Olá, preciso de ajuda com...'
                )
              }
            >
              suporte@slab.com.br
            </button>
          </div>
        </div>
      </div>

      <div className="forms_container_background">
        <div className="forms_container_content">
          <h1>{t('supportCenter.title2')}</h1>
          <div className="forms_division"></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">{t('supportCenter.forms1')}</label>
            <input
              type="text"
              id="name"
              placeholder={t('supportCenter.input1')}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">{t('supportCenter.forms2')}</label>
            <input
              type="email"
              id="email"
              placeholder={t('supportCenter.input2')}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">{t('supportCenter.forms3')}</label>
            <input
              type="tel"
              id="phone"
              placeholder={t('supportCenter.input3')}
              value={formData.phone}
              onChange={handleChange}
            />

            <label htmlFor="message">{t('supportCenter.forms4')}</label>
            <textarea
              id="message"
              rows={4}
              placeholder={t('supportCenter.input4')}
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="submit_button" disabled={isSubmitting}>
              {isSubmitting ? t('forms.sending', 'Sending...') : t('supportCenter.button')}
            </button>

            {successMessage && <p className="success_message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
