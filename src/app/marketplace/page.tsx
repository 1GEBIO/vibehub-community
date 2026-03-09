'use client';
import { useState } from 'react';
import { ShoppingBag, Star, Download, Tag, Zap, Search, ChevronRight, Check } from 'lucide-react';
import { MARKET_ITEMS } from '@/lib/data';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [purchased, setPurchased] = useState<string[]>([]);
  const [filter, setFilter] = useState('all');

  const filtered = MARKET_ITEMS.filter(item => {
    const q = search.toLowerCase();
    const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.some(t => t.includes(q));
    const matchesFilter = filter === 'all' || (filter === 'featured' && item.featured) || item.category.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const handleBuy = (id: string) => {
    setPurchased(prev => [...prev, id]);
  };

  const formatPrice = (price: number) => `$${price}`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag size={28} className="text-purple-400" />
          <h1 className="text-3xl font-bold section-title">Marketplace</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Buy and sell AI-generated templates, prompt chains, and project starters
        </p>
      </div>

      {/* Banner */}
      <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-center gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.1))', borderColor: 'rgba(139,92,246,0.2)' }}>
        <div className="flex-1">
          <div className="badge badge-purple mb-2">⚡ New: Sell your prompts</div>
          <h2 className="text-xl font-bold mb-1 section-title">Turn your best prompts into income</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Package your tested prompt chains and sell them to 18K+ builders. Keep 85% of every sale.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2 shrink-0">
          <Zap size={16} />
          List a Product
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates, prompt packs..."
            className="input-field pl-11"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'featured', 'template', 'agent'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`tag-pill capitalize ${filter === f ? 'active' : ''}`}
            >
              {f === 'all' ? '🔮 All' : f === 'featured' ? '⭐ Featured' : f === 'template' ? '📋 Templates' : '🤖 Agents'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(item => {
          const bought = purchased.includes(item.id);
          return (
            <div key={item.id} className="market-card flex flex-col">
              {/* Color preview */}
              <div className={`bg-gradient-to-br ${item.previewColor} relative`} style={{ height: '130px' }}>
                {item.featured && (
                  <div className="absolute top-3 left-3 badge badge-orange">⭐ Featured</div>
                )}
                {item.originalPrice && (
                  <div className="absolute top-3 right-3 badge badge-red">
                    {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span className="badge badge-purple">{item.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <img src={item.authorAvatar} alt={item.author} className="avatar w-6 h-6" />
                  <span className="text-xs text-purple-400">@{item.author}</span>
                </div>

                {/* Rating + sales */}
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    {item.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download size={11} />
                    {item.sales.toLocaleString()} sales
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map(t => <span key={t} className="tag-pill"># {t}</span>)}
                </div>

                {/* What's included */}
                <div className="text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
                  <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Includes:</div>
                  {item.includes.map(inc => (
                    <div key={inc} className="flex items-center gap-1.5">
                      <Check size={10} className="text-green-400 shrink-0" />
                      {inc}
                    </div>
                  ))}
                </div>

                {/* Price + Buy */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div>
                    <span className="text-xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm line-through ml-2" style={{ color: 'var(--text-secondary)' }}>
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleBuy(item.id)}
                    className={`flex items-center gap-1.5 text-sm py-2 px-4 rounded-xl font-semibold transition-all ${
                      bought
                        ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                        : 'btn-primary'
                    }`}
                  >
                    {bought ? <><Check size={14} /> Purchased</> : <><ShoppingBag size={14} /> Buy Now</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try different keywords</p>
        </div>
      )}

      {/* Sell CTA */}
      <div className="mt-16 glass-card p-8 text-center" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
        <div className="text-4xl mb-4">💰</div>
        <h2 className="text-2xl font-bold mb-2 section-title">Have killer prompts?</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          List your prompt chains, templates, and AI project starters. Earn from every download.
        </p>
        <button className="btn-primary text-base px-8 py-3">
          Start Selling →
        </button>
      </div>
    </div>
  );
}
