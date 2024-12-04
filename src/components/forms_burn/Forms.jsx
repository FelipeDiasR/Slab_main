"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Certifique-se de que o caminho está correto
import { collection, addDoc } from "firebase/firestore";
import "./forms.css";
import { useWallet } from "../../components/wallet/Walletcontext";

const Forms = () => {
  const { account, connectWallet } = useWallet();

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
      setSuccessMessage(
        "Processo iniciado! Um representante Slab entrará em contato, seu Selo ou Certificado Verde será emitido em breve."
      );
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
          <h1>Exercer Benefícios do TBIO / Realizar saque</h1>
          <div className="forms_burn_division"></div>
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

            <label htmlFor="wallet">Endereço de Carteira (obrigatório)</label>
            <input
              type="text"
              id="wallet"
              name="wallet_address"
              placeholder="0xe0e...3f3a0"
              value={formData.wallet}
              onChange={handleChange}
              autoComplete="off"
            />

            <label htmlFor="message">
              Deixe suas informações abaixo, e um representante Slab entrará em
              contato:
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Sua mensagem"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              className="submit_button_burn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>

            {successMessage && <p className="success_message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
