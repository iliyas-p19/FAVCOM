import { NextResponse } from 'next/server';
import { loadProducts, searchProducts } from '@/lib/products';
import type { Product } from '@/types';
import OpenAI from 'openai';
import { formatCurrency } from '@/utils/format';

function filterProductsByQuery(query: string): Product[] {
  const products = loadProducts();
  const lowerQuery = query.toLowerCase();
  
  // Extract price information
  const priceMatch = query.match(/(?:under|below|less than)\s*(?:\u20b9|rs\.?|inr|\$)?\s*(\d+(?:\.\d+)?)/i);
  const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : undefined;
  
  // Extract category information
  const categoryMatch = query.match(/(electronics|clothing|accessories|sports|home|kitchen|dress|shirt|shoes|bag|watch|phone|laptop|jewellery|furniture|books|toys|beauty|health|automotive)/i);
  const category = categoryMatch ? categoryMatch[1] : undefined;
  
  // Extract brand information
  const brandMatch = query.match(/(?:brand|by)\s+([a-zA-Z0-9\s]+)/i);
  const brand = brandMatch ? brandMatch[1].trim() : undefined;
  
  // Extract rating information
  const ratingMatch = query.match(/(?:rating|rated)\s*(?:above|over|more than)?\s*(\d+(?:\.\d+)?)/i);
  const minRating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;
  
  let filtered = products;
  
  // Filter by search query
  if (query.length > 2) {
    filtered = searchProducts(query, 50);
  }
  
  // Filter by category
  if (category) {
    filtered = filtered.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Filter by brand
  if (brand) {
    filtered = filtered.filter(p => 
      p.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }
  
  // Filter by price
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }
  
  // Filter by rating
  if (minRating) {
    filtered = filtered.filter(p => p.rating >= minRating);
  }
  
  // Sort by relevance (rating and reviews)
  return filtered
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, 8);
}

export async function POST(req: Request) {
  const { message } = await req.json();
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  // Always try to enrich with local catalog suggestions
  const suggested = filterProductsByQuery(String(message || ''));

  if (!OPENAI_API_KEY) {
    // Improved keyword-based dummy bot
    const q = String(message || '').toLowerCase();
    let messageText = 'Here are some options from our FAVCOM catalog.';
    
    if (q.includes('shipping') || q.includes('delivery')) {
      messageText = `We offer fast and reliable shipping! Standard delivery is 3-5 business days, express is 1-2 days. Free shipping on orders over ${formatCurrency(999)}.`;
    } else if (q.includes('return') || q.includes('refund')) {
      messageText = 'Easy returns within 30 days! Items must be in original condition with receipt. We provide hassle-free return process.';
    } else if (q.includes('price') || q.includes('budget') || q.includes('under') || q.includes('cheap')) {
      messageText = `Tell me your budget range, like "under ${formatCurrency(5000)}" or "between ${formatCurrency(1000)}-${formatCurrency(3000)}", and I'll find the best products for you!`;
    } else if (q.includes('offer') || q.includes('discount') || q.includes('sale') || q.includes('deal')) {
      messageText = 'Great deals available! Check out our featured products with discounts. Many items have special pricing - look for the discount badges!';
    } else if (q.includes('help') || q.includes('assist')) {
      messageText = `I'm here to help! You can ask me about specific products, categories, prices, or general shopping questions. Try "show me electronics under ${formatCurrency(10000)}" or "best rated laptops".`;
    } else if (q.includes('best') || q.includes('top') || q.includes('recommend')) {
      messageText = 'I\'d be happy to recommend the best products! Based on your query, here are some top-rated options from our catalog.';
    } else if (suggested.length > 0) {
      messageText = `I found ${suggested.length} great products that match your search! Here are the top recommendations:`;
    } else {
      messageText = 'I\'m here to help you find the perfect products! You can ask about specific items, categories, or get recommendations.';
    }
    
    return NextResponse.json({ message: messageText, products: suggested.slice(0, 6) });
  }

  try {
    const client = new OpenAI({ apiKey: OPENAI_API_KEY });
    const system = `You are a helpful shopping assistant for FAVCOM, an e-commerce platform with 40,000+ products. 
    
    Your role:
    - Help customers find products based on their needs, budget, and preferences
    - Provide product recommendations from our catalog
    - Answer questions about shipping, returns, and general shopping
    - Be friendly, helpful, and concise
    - Always mention relevant products when appropriate
    - Use Indian Rupee formatting for prices
    - Focus on the Indian market and preferences
    
    When suggesting products, mention key details like price, rating, and why it's a good choice.`;

    const user = String(message || '');
    const suggestionsText = suggested.slice(0, 6).map(p => 
      `${p.name} - ${formatCurrency(p.price)} (${p.rating} stars, ${p.reviews} reviews) - ${p.category}${p.brand ? ` by ${p.brand}` : ''}`
    ).join('\n');

    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `${user}\n\n${suggested.length > 0 ? `Relevant products from our catalog:\n${suggestionsText}` : 'No specific products found, but I can help with general questions.'}` },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
    
    const text = resp.choices[0]?.message?.content || 'Here are some great options from our FAVCOM catalog!';
    return NextResponse.json({ message: text, products: suggested.slice(0, 6) });
  } catch (e) {
    console.error('OpenAI API error:', e);
    return NextResponse.json({ 
      message: 'I had trouble connecting to our AI service, but here are some great products I found for you!', 
      products: suggested.slice(0, 6) 
    });
  }
}


