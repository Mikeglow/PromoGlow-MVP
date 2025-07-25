import React, { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  };

  return submitted ? (
    <p className="text-green-600">Dziękujemy! Jesteś zapisany/a 💌</p>
  ) : (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="email"
        placeholder="Twój e-mail..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-pink-300 rounded w-64"
        required
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Zapisz się
      </button>
    </form>
  );
}