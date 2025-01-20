"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Certifique-se de que o caminho está correto
import { collection, addDoc } from "firebase/firestore";
import "./forms.css";
import { useWallet } from "../../components/wallet/Walletcontext";
import { useTranslation } from "react-i18next"; // Importar o hook de tradução

const Forms = () => {
  const { account } = useWallet();
  const { t } = useTranslation(); // Hook para tradução

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    wallet: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Preencher o endereço da carteira automaticamente
  useEffect(() => {
    if (account) {
      setFormData((prevData) => ({
        ...prevData,
        wallet: account, // Preenche com o endereço da carteira conectado
      }));
    }
  }, [account]); // Atualiza sempre que o endereço da carteira mudar

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
      await addDoc(collection(db, "CprBurn"), formData);
      setSuccessMessage(t("forms.messages.success"));
      setFormData({ name: "", email: "", phone: "", wallet: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forms_burn">
      <div className="forms_burn_background">
        <div className="forms_burn_content">
          <h1>{t("forms.titles.mainTitle")}</h1>
          <div className="forms_burn_division"></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">{t("forms.labels.name")}</label>
            <input
              type="text"
              id="name"
              placeholder={t("forms.placeholders.name")}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">{t("forms.labels.email")}</label>
            <input
              type="email"
              id="email"
              placeholder={t("forms.placeholders.email")}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">{t("forms.labels.phone")}</label>
            <input
              type="tel"
              id="phone"
              placeholder={t("forms.placeholders.phone")}
              value={formData.phone}
              onChange={handleChange}
            />

            <label htmlFor="wallet">{t("forms.labels.wallet")}</label>
            <input
              type="text"
              id="wallet"
              name="wallet_address"
              placeholder={t("forms.placeholders.wallet")}
              value={formData.wallet}
              onChange={handleChange}
              autoComplete="off"
            />

            <label htmlFor="message">{t("forms.labels.message")}</label>
            <textarea
              id="message"
              rows={4}
              placeholder={t("forms.placeholders.message")}
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              className="submit_button_burn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("forms.buttons.submitting")
                : t("forms.buttons.submit")}
            </button>

            {successMessage && (
              <p className="success_message">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
