import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { loadProducts } from '@/lib/products';

// Returns product recommendations given optional userId or productId
// Uses OpenAI if available for a simple re-ranking; otherwise falls back to category/price heuristic

export async function POST(req: Request) {
  const { userId, productId, limit = 4 } = await req.json();
  const products = loadProducts();
  let candidates = products;

  if (productId) {
    const target = products.find(p => String(p.id) === String(productId));
    if (target) {
      const window = Math.max(20, target.price * 0.3);
      candidates = products.filter(p => p.id !== target.id && p.category === target.category && Math.abs(p.price - target.price) <= window);
    }
  }

  if (userId && !productId) {
    const cats = Array.from(new Set(products.map(p => p.category)));
    const hash = Array.from(String(userId)).reduce((a, c) => a + c.charCodeAt(0), 0);
    const fav = cats[hash % cats.length];
    candidates = products.filter(p => p.category === fav);
  }

  if (candidates.length === 0) candidates = products;

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    // fallback: sort by price ascending as a simple default
    const simple = candidates.sort((a, b) => a.price - b.price).slice(0, limit);
    return NextResponse.json(simple);
  }

  try {
    const client = new OpenAI({ apiKey: OPENAI_API_KEY });
    const text = candidates.slice(0, 20).map(p => `${p.id} | ${p.name} | ${p.category} | INR ${p.price}`).join('\n');
    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Rank these products for a typical e-commerce user. Reply with the top IDs only as CSV.' },
        { role: 'user', content: text }
      ],
      max_tokens: 60
    });
    const csv = resp.choices[0]?.message?.content || '';
    const ids = csv.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
    const ranked = candidates
      .filter(p => ids.includes(String(p.id)))
      .concat(candidates.filter(p => !ids.includes(String(p.id))))
      .slice(0, limit);
    return NextResponse.json(ranked);
  } catch (e) {
    const simple = candidates.sort((a, b) => a.price - b.price).slice(0, limit);
    return NextResponse.json(simple);
  }
}


