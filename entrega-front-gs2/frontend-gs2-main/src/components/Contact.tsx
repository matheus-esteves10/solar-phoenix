"use client";

import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para envio de mensagem (exemplo simples)
    console.log('Mensagem enviada:', { name, email, message });
    alert('Mensagem enviada com sucesso!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-10 px-40 my-10 mx-auto w-fit bg-gray-500 rounded-md text-center">
      <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-800">
          Enviar Mensagem
        </button>
      </form>
    </section>
  );
}
