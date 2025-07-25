import React, { useEffect, useState } from 'react';

export function PromotionsList({ filter }: { filter: string }) {
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/promotions')
      .then((res) => res.json())
      .then(setPromotions);
  }, []);

  const filtered = promotions.filter((promo) =>
    promo.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((promo) => (
        <div key={promo.id} className="border rounded p-4 shadow">
          <img src={promo.image} alt={promo.name} className="w-full h-40 object-cover mb-2 rounded" />
          <h2 className="text-lg font-semibold">{promo.name}</h2>
          <p className="text-sm text-gray-600">{promo.store}</p>
          <p className="text-pink-600 font-bold mt-1">{promo.price} zł</p>
          <a
            href={promo.link}
            target="_blank"
            className="inline-block mt-2 text-sm text-pink-500 hover:underline"
            rel="noopener noreferrer"
          >
            Zobacz ofertę
          </a>
        </div>
      ))}
    </div>
  );
}