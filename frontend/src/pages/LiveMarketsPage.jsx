import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, TrendingDown, Search, Filter, ShieldCheck, Activity, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveMarketsPage = () => {
  const { marketData, activeCategory, setActiveCategory } = useMarket();
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Assets' },
    { id: 'index', label: 'Indices' },
    { id: 'stock', label: 'Equities' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'commodity', label: 'Commodities' },
  ];

  const filteredAssets = marketData.filter((asset) => {
    const matchesCategory = activeCategory === 'all' || asset.asset_class === activeCategory;
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) || 
                          asset.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-emerald-600" />
            Live Market Heatmap & Quotes
          </h1>
          <p className="text-xs text-slate-600 mt-1">Real-time streaming prices, 24h high/low ranges & percentage change indicators.</p>
        </div>

        <Link
          to="/charts"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>Launch Chart Workstation</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-3d-card-light">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search assets (e.g. NIFTY, BTC)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 font-medium text-xs placeholder-slate-400 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* 3D Markets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1000">
        {filteredAssets.map((asset) => {
          const isPos = asset.change >= 0;
          return (
            <div
              key={asset.symbol}
              className="p-6 rounded-3xl glass-3d-card-light card-3d-tilt flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-black text-slate-900 text-lg block">{asset.symbol}</span>
                  <span className="text-xs text-slate-500 font-medium">{asset.name}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase ${
                  isPos ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {asset.asset_class}
                </span>
              </div>

              <div>
                <span className="text-3xl font-mono font-black text-slate-900 block">₹{asset.price.toLocaleString()}</span>
                <span className={`text-xs font-mono font-black flex items-center mt-1 ${isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPos ? <TrendingUp className="w-4 h-4 mr-1 text-emerald-600" /> : <TrendingDown className="w-4 h-4 mr-1 text-rose-600" />}
                  {isPos ? '+' : ''}{asset.percent_change}% ({isPos ? '+' : ''}{asset.change})
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">24h High</span>
                  <span className="font-bold text-slate-800">₹{asset.high.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">24h Low</span>
                  <span className="font-bold text-slate-800">₹{asset.low.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default LiveMarketsPage;
