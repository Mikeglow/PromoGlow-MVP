import React, { useState } from 'react';
import { PromotionsList } from '../components/PromotionsList';
import { NewsletterSignup } from '../components/NewsletterSignup';

export default function Home() {
  const [filter, setFilter] = useState('');

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <header className="bg-pink-100 p-6 shadow-md">
        <h1 className="text-3xl font-bold">PromoGlow – najlepsze promocje kosmetyczne</h1>
        <p className="mt-2 text-sm">Rossmann, Hebe, Allegro i więcej</p>
        <input
          type="text"
          placeholder="Szukaj marki, produktu..."
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 p-2 w-full max-w-md border border-pink-300 rounded"
        />
      </header>

      <section className="p-4">
        <PromotionsList filter={filter} />
      </section>

      <footer className="bg-pink-50 p-4 text-center">
        <NewsletterSignup />
        <p className="text-xs mt-4">© 2025 PromoGlow.pl</p>
      </footer>
    </main>
  );
}