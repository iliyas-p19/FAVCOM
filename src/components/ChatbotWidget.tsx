'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { Product } from '@/types';
import { formatCurrency } from '@/utils/format';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      });
      const data = await res.json();
      const botMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: data.message };
      setMessages(prev => [...prev, botMsg]);

      // Show product suggestions returned by API
      if (Array.isArray(data.products) && data.products.length) {
        const productLines = (data.products as Product[]).slice(0, 4).map(p => 
          `• ${p.name} - ${formatCurrency(p.price)} (${p.rating} stars, ${p.reviews} reviews)`
        );
        setMessages(prev => [...prev, { 
          id: crypto.randomUUID(), 
          role: 'assistant', 
          content: `Here are some great options from our catalog:\n${productLines.join('\n')}` 
        }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'Sorry, I had trouble responding. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="rounded-full bg-blue-600 text-white px-4 py-3 shadow-lg hover:bg-blue-700 transition-colors duration-200"
        aria-label="Open shopping assistant"
      >
        {open ? 'Close Chat' : 'Chat'}
      </button>

      {/* Panel */}
      <div className={clsx('mt-3 w-80 sm:w-96 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden', open ? 'block' : 'hidden')}>
        <div className="px-4 py-3 border-b border-gray-700 bg-blue-600 text-white font-semibold">
          FAVCOM AI Assistant
        </div>
        <div ref={listRef} className="h-80 overflow-y-auto p-3 space-y-2 bg-gray-900">
          {messages.map(m => (
            <div key={m.id} className={clsx('max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-wrap', m.role === 'user' ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-gray-800 border border-gray-700 text-white')}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-gray-800 border border-gray-700 max-w-[60%] px-3 py-2 rounded-lg text-gray-400">Typing…</div>
          )}
        </div>
        <div className="p-3 flex gap-2 border-t border-gray-700 bg-gray-800">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about products, shipping, offers…"
            className="input flex-1"
          />
          <button onClick={send} disabled={loading} className="btn-primary disabled:opacity-50">Send</button>
        </div>
      </div>
    </div>
  );
}


