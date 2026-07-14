'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

interface RecommendationsSectionProps {
  title: string;
  userId?: string;
  productId?: string;
  limit?: number;
}

export default function RecommendationsSection({ title, userId, productId, limit = 4 }: RecommendationsSectionProps) {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/recommendations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, productId, limit }) });
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      }
    };
    run();
  }, [userId, productId, limit]);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}


